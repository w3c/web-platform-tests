"use strict";
// https://console.spec.whatwg.org/#timing

test(() => {
  let timeLabelToStringCalled = false;
  let timeEndLabelToStringCalled = false;

  console.time({
    toString() {
      timeLabelToStringCalled = true;
    }
  });

  console.timeEnd({
    toString() {
      timeEndLabelToStringCalled = true;
    }
  });

  assert_true(timeLabelToStringCalled, "toString() was never called on time()'s label when label is an object");
  assert_true(timeEndLabelToStringCalled, "toString() was never called on timeEnd()'s label when label is an object");
}, "console timer label gets converted to string via label.toString() when label is an object");

test(() => {
  assert_throws(null, () => {
    console.time({
      toString() {
        throw new Error("conversion error");
      }
    });
  }, "time() does not re-throw exceptions thrown by label.toString() conversion");

  assert_throws({name: "Error"}, () => {
    console.timeEnd({
      toString() {
        throw new Error("conversion error");
      }
    });
  }, "timeEnd() does not re-throw exceptions thrown by label.toString() conversion");
}, "console time/timeEnd re-throw any exceptions generated by erroneous label.toString() conversion");
