// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.line.union
// Description:
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.lineWidth = 100;
ctx.lineCap = 'round';
ctx.strokeStyle = '#0f0';
ctx.beginPath();
ctx.moveTo(0, 24);
ctx.lineTo(100, 25);
ctx.lineTo(0, 26);
ctx.closePath();
ctx.stroke();
_assertPixel(offscreenCanvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
_assertPixel(offscreenCanvas, 25,1, 0,255,0,255, "25,1", "0,255,0,255");
_assertPixel(offscreenCanvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
_assertPixel(offscreenCanvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
_assertPixel(offscreenCanvas, 25,1, 0,255,0,255, "25,1", "0,255,0,255");
_assertPixel(offscreenCanvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");

t.done();

});
done();
