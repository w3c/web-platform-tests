// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.line.cap.round
// Description:lineCap 'round' is rendered correctly
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("lineCap 'round' is rendered correctly");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 100, 50);
var tol = 1; // tolerance to avoid antialiasing artifacts
ctx.lineCap = 'round';
ctx.lineWidth = 20;
ctx.fillStyle = '#f00';
ctx.strokeStyle = '#0f0';
ctx.beginPath();
ctx.moveTo(35-tol, 15);
ctx.arc(25, 15, 10-tol, 0, Math.PI, true);
ctx.arc(25, 35, 10-tol, Math.PI, 0, true);
ctx.fill();
ctx.beginPath();
ctx.moveTo(25, 15);
ctx.lineTo(25, 35);
ctx.stroke();
ctx.fillStyle = '#0f0';
ctx.strokeStyle = '#f00';
ctx.beginPath();
ctx.moveTo(75, 15);
ctx.lineTo(75, 35);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(85+tol, 15);
ctx.arc(75, 15, 10+tol, 0, Math.PI, true);
ctx.arc(75, 35, 10+tol, Math.PI, 0, true);
ctx.fill();
_assertPixel(offscreenCanvas, 17,6, 0,255,0,255, "17,6", "0,255,0,255");
_assertPixel(offscreenCanvas, 25,6, 0,255,0,255, "25,6", "0,255,0,255");
_assertPixel(offscreenCanvas, 32,6, 0,255,0,255, "32,6", "0,255,0,255");
_assertPixel(offscreenCanvas, 17,43, 0,255,0,255, "17,43", "0,255,0,255");
_assertPixel(offscreenCanvas, 25,43, 0,255,0,255, "25,43", "0,255,0,255");
_assertPixel(offscreenCanvas, 32,43, 0,255,0,255, "32,43", "0,255,0,255");
_assertPixel(offscreenCanvas, 67,6, 0,255,0,255, "67,6", "0,255,0,255");
_assertPixel(offscreenCanvas, 75,6, 0,255,0,255, "75,6", "0,255,0,255");
_assertPixel(offscreenCanvas, 82,6, 0,255,0,255, "82,6", "0,255,0,255");
_assertPixel(offscreenCanvas, 67,43, 0,255,0,255, "67,43", "0,255,0,255");
_assertPixel(offscreenCanvas, 75,43, 0,255,0,255, "75,43", "0,255,0,255");
_assertPixel(offscreenCanvas, 82,43, 0,255,0,255, "82,43", "0,255,0,255");
t.done();

});
done();
