// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.gradient.alpha
// Description:Shadows are drawn correctly for partially-transparent gradient fills
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Shadows are drawn correctly for partially-transparent gradient fills");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var gradient = ctx.createLinearGradient(0, 0, 100, 0);
gradient.addColorStop(0, 'rgba(255,0,0,0.5)');
gradient.addColorStop(1, 'rgba(255,0,0,0.5)');
ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.shadowOffsetY = 50;
ctx.shadowColor = '#00f';
ctx.fillStyle = gradient;
ctx.fillRect(0, -50, 100, 50);
_assertPixelApprox(offscreenCanvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

t.done();

});
done();
