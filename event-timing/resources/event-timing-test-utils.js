// Clicks on the element with the given ID. It adds an event handler to the element which
// ensures that the events have a duration of at least |delay|. Calls |callback| during
// event handler if |callback| is provided.
async function clickOnElementAndDelay(id, delay, callback) {
  const element = document.getElementById(id);
  const clickHandler = () => {
    mainThreadBusy(delay);
    if (callback)
      callback();
    element.removeEventListener("mousedown", clickHandler);
  };
  element.addEventListener("mousedown", clickHandler);
  await test_driver.click(element);
}

function mainThreadBusy(duration) {
  const now = performance.now();
  while (performance.now() < now + duration);
}

// This method should receive an entry of type 'event'. |isFirst| is true only when we want
// to check that the event also happens to correspond to the first event. In this case, the
// timings of the 'first-input' entry should be equal to those of this entry. |minDuration|
// is used to compared against entry.duration.
function verifyEvent(entry, eventType, targetId, isFirst=false, minDuration=104, notCancelable=false) {
  assert_equals(entry.cancelable, !notCancelable, 'cancelable property');
  assert_equals(entry.name, eventType);
  assert_equals(entry.entryType, 'event');
  assert_greater_than_equal(entry.duration, minDuration,
      "The entry's duration should be greater than or equal to " + minDuration + " ms.");
  assert_greater_than_equal(entry.processingStart, entry.startTime,
      "The entry's processingStart should be greater than or equal to startTime.");
  assert_greater_than_equal(entry.processingEnd, entry.processingStart,
      "The entry's processingEnd must be at least as large as processingStart.");
  // |duration| is a number rounded to the nearest 8 ms, so add 4 to get a lower bound
  // on the actual duration.
  assert_greater_than_equal(entry.duration + 4, entry.processingEnd - entry.startTime,
      "The entry's duration must be at least as large as processingEnd - startTime.");
  if (isFirst) {
    let firstInputs = performance.getEntriesByType('first-input');
    assert_equals(firstInputs.length, 1, 'There should be a single first-input entry');
    let firstInput = firstInputs[0];
    assert_equals(firstInput.name, entry.name);
    assert_equals(firstInput.entryType, 'first-input');
    assert_equals(firstInput.startTime, entry.startTime);
    assert_equals(firstInput.duration, entry.duration);
    assert_equals(firstInput.processingStart, entry.processingStart);
    assert_equals(firstInput.processingEnd, entry.processingEnd);
    assert_equals(firstInput.cancelable, entry.cancelable);
  }
  if (targetId)
    assert_equals(entry.target, document.getElementById(targetId));
}

function verifyClickEvent(entry, targetId, isFirst=false, minDuration=104) {
  verifyEvent(entry, 'mousedown', targetId, isFirst, minDuration);
}

function wait() {
  return new Promise((resolve, reject) => {
    step_timeout(() => {
      resolve();
    }, 0);
  });
}

function clickAndBlockMain(id) {
  return new Promise((resolve, reject) => {
    clickOnElementAndDelay(id, 120, resolve);
  });
}

  // Add a PerformanceObserver and observe with a durationThreshold of |dur|. This test will
  // attempt to check that the duration is appropriately checked by:
  // * Asserting that entries received have a duration which is the smallest multiple of 8
  //   that is greater than or equal to |dur|.
  // * Issuing |numEntries| entries that are fast, of duration |slowDur|.
  // * Issuing |numEntries| entries that are slow, of duration |fastDur|.
  // * Asserting that at least |numEntries| entries are received (at least the slow ones).
  // Parameters:
  // |t|          - the test harness.
  // |dur|        - the durationThreshold for the PerformanceObserver.
  // |id|         - the ID of the element to be clicked.
  // |numEntries| - the number of slow and number of fast entries.
  // |slowDur|    - the min duration of a slow entry.
  // |fastDur|    - the min duration of a fast entry.
async function testDuration(t, id, numEntries, dur, fastDur, slowDur) {
  assert_implements(window.PerformanceEventTiming, 'Event Timing is not supported.');
  const observerPromise = new Promise(async resolve => {
    let minDuration = Math.ceil(dur / 8) * 8;
    // Exposed events must always have a minimum duration of 16.
    minDuration = Math.max(minDuration, 16);
    let numEntriesReceived = 0;
    new PerformanceObserver(list => {
      const mouseDowns = list.getEntriesByName('mousedown');
      mouseDowns.forEach(e => {
        t.step(() => {
          verifyClickEvent(e, id, false /* isFirst */, minDuration);
        });
      });
      numEntriesReceived += mouseDowns.length;
      // Note that we may receive more entries if the 'fast' click events turn out slower
      // than expected.
      if (numEntriesReceived >= numEntries)
        resolve();
    }).observe({type: "event", durationThreshold: dur});
  });
  const clicksPromise = new Promise(async resolve => {
    for (let index = 0; index < numEntries; index++) {
      // Add some fast click events.
      await clickOnElementAndDelay(id, slowDur);
      // Add some slow click events.
      if (fastDur > 0) {
        await clickOnElementAndDelay(id, fastDur);
      } else {
        // We can just directly call test_driver when |fastDur| is 0.
        await test_driver.click(document.getElementById(id));
      }
    }
    resolve();
  });
  return Promise.all([observerPromise, clicksPromise]);
}

// Apply events that trigger an event of the given |eventType| to be dispatched to the
// |target|. Some of these assume that the target is not on the top left corner of the
// screen, which means that (0, 0) of the viewport is outside of the |target|.
function applyAction(eventType, target) {
  const actions = new test_driver.Actions();
  if (eventType === 'auxclick') {
    actions.pointerMove(0, 0, {origin: target})
    .pointerDown({button: actions.ButtonType.MIDDLE})
    .pointerUp({button: actions.ButtonType.MIDDLE});
  } else if (eventType === 'click' || eventType === 'mousedown' || eventType === 'mouseup'
      || eventType === 'pointerdown' || eventType === 'pointerup'
      || eventType === 'touchstart' || eventType === 'touchend') {
    actions.pointerMove(0, 0, {origin: target})
    .pointerDown()
    .pointerUp();
  } else if (eventType === 'contextmenu') {
    actions.pointerMove(0, 0, {origin: target})
    .pointerDown({button: actions.ButtonType.RIGHT})
    .pointerUp({button: actions.ButtonType.RIGHT});
  } else if (eventType === 'dblclick') {
    actions.pointerMove(0, 0, {origin: target})
    .pointerDown()
    .pointerUp()
    .pointerDown()
    .pointerUp()
    // Reset by clicking outside of the target.
    .pointerMove(0, 0)
    .pointerDown()
    .pointerUp();
  } else if (eventType === 'mouseenter' || eventType === 'mouseover'
      || eventType === 'pointerenter' || eventType === 'pointerover') {
    // Move outside of the target and then back inside.
    actions.pointerMove(0, 0)
    .pointerMove(0, 0, {origin: target});
  } else if (eventType === 'mouseleave' || eventType === 'mouseout'
      || eventType === 'pointerleave' || eventType === 'pointerout') {
    actions.pointerMove(0, 0, {origin: target})
    .pointerMove(0, 0);
  } else {
    assert_unreached('The event type ' + eventType + ' is not supported.');
  }
  return actions.send();
}

function requiresListener(eventType) {
  return ['mouseenter',
          'mouseleave',
          'pointerdown',
          'pointerenter',
          'pointerleave',
          'pointerout',
          'pointerover',
          'pointerup'
        ].includes(eventType);
}

function notCancelable(eventType) {
  return ['mouseenter', 'mouseleave', 'pointerenter', 'pointerleave'].includes(eventType);
}

// Tests the given |eventType| by creating events whose target are the element with id
// 'target'. The test assumes that such element already exists. |looseCount| is set for
// eventTypes for which events would occur for other elements besides the target, so the
// counts will be larger.
async function testEventType(t, eventType, looseCount=false) {
  assert_implements(window.EventCounts, "Event Counts isn't supported");
  assert_equals(performance.eventCounts.get(eventType), 0);
  const target = document.getElementById('target');
  if (requiresListener(eventType)) {
    target.addEventListener(eventType, () =>{});
  }
  assert_equals(performance.eventCounts.get(eventType), 0, 'No events yet.');
  // Trigger two 'fast' events of the type.
  await applyAction(eventType, target);
  await applyAction(eventType, target);
  if (looseCount) {
    assert_greater_than_equal(performance.eventCounts.get(eventType), 2,
        `Should have at least 2 ${eventType} events`)
  } else {
    assert_equals(performance.eventCounts.get(eventType), 2,
        `Should have 2 ${eventType} events`);
  }
  // The durationThreshold used by the observer. A slow events needs to be slower than that.
  const durationThreshold = 16;
  // Now add an event handler to cause a slow event.
  target.addEventListener(eventType, () => {
    mainThreadBusy(durationThreshold + 4);
  });
  const observerPromise = new Promise(async resolve => {
    new PerformanceObserver(t.step_func(entryList => {
      let eventTypeEntries = entryList.getEntriesByName(eventType);
      if (eventTypeEntries.length === 0)
        return;

      let entry = null;
      if (!looseCount) {
        entry = eventTypeEntries[0];
        assert_equals(eventTypeEntries.length, 1);
      } else {
        // The other events could also be considered slow. Find the one with the correct
        // target.
        eventTypeEntries.forEach(e => {
          if (e.target === document.getElementById('target'))
            entry = e;
        });
        if (!entry)
          return;
      }
      verifyEvent(entry,
                  eventType,
                  'target',
                  false /* isFirst */,
                  durationThreshold,
                  notCancelable(eventType));
      if (looseCount) {
        assert_greater_than_equal(performance.eventCounts.get(eventType), 3,
            `Should have at least 3 ${eventType} events`)
      } else {
        assert_equals(performance.eventCounts.get(eventType), 3,
            `Should have 3 ${eventType} events`);
      }
      resolve();
    })).observe({type: 'event', durationThreshold: durationThreshold});
  });
  // Cause a slow event.
  let actionPromise = applyAction(eventType, target);
  return Promise.all([actionPromise, observerPromise]);
}
