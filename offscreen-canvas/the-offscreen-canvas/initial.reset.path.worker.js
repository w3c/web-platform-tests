// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:initial.reset.path
// Description:Resetting the canvas state resets the current path
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Resetting the canvas state resets the current path");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

offscreenCanvas.width = 100;
ctx.rect(0, 0, 100, 50);
offscreenCanvas.width = 100;
ctx.fillStyle = '#f00';
ctx.fill();
_assertPixel(offscreenCanvas, 20,20, 0,0,0,0, "20,20", "0,0,0,0");
t.done();

});
done();
