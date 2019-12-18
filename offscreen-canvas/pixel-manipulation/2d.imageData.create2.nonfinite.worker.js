// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.create2.nonfinite
// Description:createImageData() throws TypeError if arguments are not finite
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("createImageData() throws TypeError if arguments are not finite");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

assert_throws(new TypeError(), function() { ctx.createImageData(Infinity, 10); });
assert_throws(new TypeError(), function() { ctx.createImageData(-Infinity, 10); });
assert_throws(new TypeError(), function() { ctx.createImageData(NaN, 10); });
assert_throws(new TypeError(), function() { ctx.createImageData(10, Infinity); });
assert_throws(new TypeError(), function() { ctx.createImageData(10, -Infinity); });
assert_throws(new TypeError(), function() { ctx.createImageData(10, NaN); });
assert_throws(new TypeError(), function() { ctx.createImageData(Infinity, Infinity); });
var posinfobj = { valueOf: function() { return Infinity; } },
    neginfobj = { valueOf: function() { return -Infinity; } },
    nanobj = { valueOf: function() { return -Infinity; } };
assert_throws(new TypeError(), function() { ctx.createImageData(posinfobj, 10); });
assert_throws(new TypeError(), function() { ctx.createImageData(neginfobj, 10); });
assert_throws(new TypeError(), function() { ctx.createImageData(nanobj, 10); });
assert_throws(new TypeError(), function() { ctx.createImageData(10, posinfobj); });
assert_throws(new TypeError(), function() { ctx.createImageData(10, neginfobj); });
assert_throws(new TypeError(), function() { ctx.createImageData(10, nanobj); });
assert_throws(new TypeError(), function() { ctx.createImageData(posinfobj, posinfobj); });
t.done();

});
done();
