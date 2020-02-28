// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.path.arcTo.shape.start
// Description:arcTo() draws a straight line from P0 to P1
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("arcTo() draws a straight line from P0 to P1");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.strokeStyle = '#0f0';
ctx.lineWidth = 50;
ctx.beginPath();
ctx.moveTo(0, 25);
ctx.arcTo(200, 25, 200, 50, 10);
ctx.stroke();
_assertPixel(offscreenCanvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
_assertPixel(offscreenCanvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
_assertPixel(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
_assertPixel(offscreenCanvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
_assertPixel(offscreenCanvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");
t.done();

});
done();
