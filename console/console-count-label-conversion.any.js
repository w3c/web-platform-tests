"use strict";
// https://console.spec.whatwg.org/#count

test(() => {
  let countLabelToStringCalled = false;

  console.count({
    toString() {
      countLabelToStringCalled = true;
    }
  });

  assert_true(countLabelToStringCalled, "toString() must be called on count()'s label when label is an object");
}, "console.count()'s label gets converted to string via label.toString() when label is an object");

test(() => {
  assert_throws({name: "Error"}, () => {
    console.count({
      toString() {
        throw new Error("conversion error");
      }
    });
  }, "count() must re-throw any exceptions thrown by label.toString() conversion");
}, "console.count() throws exceptions generated by erroneous label.toString() conversion");
