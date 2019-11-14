test(() => {
  if (typeof PerformanceObserver.supportedEntryTypes === "undefined")
    assert_unreached("supportedEntryTypes is not supported.");
  const types = PerformanceObserver.supportedEntryTypes;
  assert_true(types.includes("first-input"),
    "There should be 'first-input' in PerformanceObserver.supportedEntryTypes");
  assert_true(types.includes("event"),
    "There should be 'event' in PerformanceObserver.supportedEntryTypes");
  assert_greater_than(types.indexOf("first-input"), types.indexOf('event'),
    "The 'first-input' entry should appear after the 'event' entry");
}, "supportedEntryTypes contains 'event' and 'first-input'.");
