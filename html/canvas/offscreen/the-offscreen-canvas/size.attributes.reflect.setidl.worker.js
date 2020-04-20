// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:size.attributes.reflect.setidl
// Description:Setting IDL attributes updates IDL and content attributes
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Setting IDL attributes updates IDL and content attributes");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

offscreenCanvas.width = 120;
offscreenCanvas.height = 60;
_assertSame(offscreenCanvas.width, 120, "offscreenCanvas.width", "120");
_assertSame(offscreenCanvas.height, 60, "offscreenCanvas.height", "60");
t.done();

});
done();
