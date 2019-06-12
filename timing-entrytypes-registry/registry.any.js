// META: script=resources/utils.js

test(() => {
  assert_true(!!self.PerformanceObserver, "PerformanceObserver");
  assert_true(!!self.PerformanceObserver.supportedEntryTypes,
              "PerformanceObserver.supportedEntryTypes");
}, "PerformanceObserver.supportedEntryTypes exists");

// UPDATE HERE if new entry
[
  [ "mark", "PerformanceMark" ],
  [ "measure", "PerformanceMeasure" ],
  [ "resource", "PerformanceResourceTiming" ],
  [ "longtask", "PerformanceLongTaskTiming" ],
].forEach(test_support);

// UPDATE BELOW to ensure the entry gets created

// mark
self.performance.mark('mymark');

// measure
self.performance.measure('mymeasure');

// resource
fetch(self.location.href + "?" + Math.random());

// longtask
function syncWait(waitDuration) {
  if (waitDuration <= 0)
    return;

  const startTime = performance.now();
  let unused = '';
  for (let i = 0; i < 10000; i++)
    unused += '' + Math.random();

  return syncWait(waitDuration - (performance.now() - startTime));
}
syncWait(50);

