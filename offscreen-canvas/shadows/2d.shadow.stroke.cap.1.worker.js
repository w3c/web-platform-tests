// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.stroke.cap.1
// Description:Shadows are not drawn for areas outside stroke caps
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Shadows are not drawn for areas outside stroke caps");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 100, 50);
ctx.strokeStyle = '#f00';
ctx.shadowColor = '#f00';
ctx.shadowOffsetY = 50;
ctx.beginPath();
ctx.lineWidth = 50;
ctx.lineCap = 'butt';
ctx.moveTo(-50, -25);
ctx.lineTo(0, -25);
ctx.moveTo(100, -25);
ctx.lineTo(150, -25);
ctx.stroke();
_assertPixel(offscreenCanvas, 1,25, 0,255,0,255, "1,25", "0,255,0,255");
_assertPixel(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
_assertPixel(offscreenCanvas, 98,25, 0,255,0,255, "98,25", "0,255,0,255");

t.done();

});
done();
