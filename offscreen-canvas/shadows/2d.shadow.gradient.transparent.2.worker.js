// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.gradient.transparent.2
// Description:Shadows are not drawn for transparent parts of gradient fills
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Shadows are not drawn for transparent parts of gradient fills");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var gradient = ctx.createLinearGradient(0, 0, 100, 0);
gradient.addColorStop(0, '#f00');
gradient.addColorStop(0.499, '#f00');
gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
gradient.addColorStop(1, 'rgba(0,0,0,0)');
ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 50, 50);
ctx.fillStyle = '#0f0';
ctx.fillRect(50, 0, 50, 50);
ctx.shadowOffsetY = 50;
ctx.shadowColor = '#0f0';
ctx.fillStyle = gradient;
ctx.fillRect(0, -50, 100, 50);
_assertPixel(offscreenCanvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
_assertPixel(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
_assertPixel(offscreenCanvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

t.done();

});
done();
