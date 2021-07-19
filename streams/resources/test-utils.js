'use strict';

self.methodRejects = (t, obj, methodName, target, args) => {
  const method = obj[methodName];

  return promise_rejects_js(t, TypeError, method.apply(target, args),
                         methodName + ' should reject with a TypeError');
};

self.garbageCollect = () => {
  if (self.gc) {
    // Use --expose_gc for V8 (and Node.js)
    // to pass this flag at chrome launch use: --js-flags="--expose-gc"
    // Exposed in SpiderMonkey shell as well
    self.gc();
  } else if (self.GCController) {
    // Present in some WebKit development environments
    GCController.collect();
  } else {
    /* eslint-disable no-console */
    console.warn('Tests are running without the ability to do manual garbage collection. They will still work, but ' +
      'coverage will be suboptimal.');
    /* eslint-enable no-console */
  }
};

self.delay = ms => new Promise(resolve => step_timeout(resolve, ms));

// For tests which verify that the implementation doesn't do something it shouldn't, it's better not to use a
// timeout. Instead, assume that any reasonable implementation is going to finish work after 2 times around the event
// loop, and use flushAsyncEvents().then(() => assert_array_equals(...));
// Some tests include promise resolutions which may mean the test code takes a couple of event loop visits itself. So go
// around an extra 2 times to avoid complicating those tests.
self.flushAsyncEvents = () => delay(0).then(() => delay(0)).then(() => delay(0)).then(() => delay(0));
