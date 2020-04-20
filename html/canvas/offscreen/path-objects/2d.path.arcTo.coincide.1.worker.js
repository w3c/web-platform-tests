// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.path.arcTo.coincide.1
// Description:arcTo() has no effect if P0 = P1
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("arcTo() has no effect if P0 = P1");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.lineWidth = 50;
ctx.strokeStyle = '#0f0';
ctx.beginPath();
ctx.moveTo(0, 25);
ctx.arcTo(0, 25, 50, 1000, 1);
ctx.lineTo(100, 25);
ctx.stroke();
ctx.strokeStyle = '#f00';
ctx.beginPath();
ctx.moveTo(50, 25);
ctx.arcTo(50, 25, 100, 25, 1);
ctx.stroke();
_assertPixel(offscreenCanvas, 50,1, 0,255,0,255, "50,1", "0,255,0,255");
_assertPixel(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
_assertPixel(offscreenCanvas, 50,48, 0,255,0,255, "50,48", "0,255,0,255");
t.done();

});
done();
