"use strict";
// https://console.spec.whatwg.org/#timing

test(() => {
  let timeLabelToStringCalled = false;

  console.time({
    toString() {
      timeLabelToStringCalled = true;
    }
  });

  assert_true(timeLabelToStringCalled, "toString() must be called on time()'s label when label is an object");
}, "console.time()'s label gets converted to string via label.toString() when label is an object");

test(() => {
  let timeEndLabelToStringCalled = false;

  console.timeEnd({
    toString() {
      timeEndLabelToStringCalled = true;
    }
  });

  assert_true(timeEndLabelToStringCalled, "toString() must be called on timeEnd()'s label when label is an object");
}, "console.timeEnd()'s label gets converted to string via label.toString() when label is an object");

test(() => {
  assert_throws(null, () => {
    console.time({
      toString() {
        throw new Error("conversion error");
      }
    });
  }, "time() must re-throw any exceptions thrown by label.toString() conversion");
}, "console.time() throws exceptions generated by erroneous label.toString() conversion");

test(() => {
  assert_throws({name: "Error"}, () => {
    console.timeEnd({
      toString() {
        throw new Error("conversion error");
      }
    });
  }, "timeEnd() must re-throw any exceptions thrown by label.toString() conversion");
}, "console.timeEnd() throws exceptions generated by erroneous label.toString() conversion");