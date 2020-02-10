// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.transformation.scale.basic
// Description:scale() works
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("scale() works");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.scale(2, 4);
ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 50, 12.5);
_assertPixel(offscreenCanvas, 90,40, 0,255,0,255, "90,40", "0,255,0,255");
t.done();

});
done();
