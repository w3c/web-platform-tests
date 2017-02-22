// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.gradient.interpolate.multiple
// Description:
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

offscreenCanvas.width = 200;
var g = ctx.createLinearGradient(0, 0, 200, 0);
g.addColorStop(0, '#ff0');
g.addColorStop(0.5, '#0ff');
g.addColorStop(1, '#f0f');
ctx.fillStyle = g;
ctx.fillRect(0, 0, 200, 50);
_assertPixelApprox(offscreenCanvas, 50,25, 127,255,127,255, "50,25", "127,255,127,255", 3);
_assertPixelApprox(offscreenCanvas, 100,25, 0,255,255,255, "100,25", "0,255,255,255", 3);
_assertPixelApprox(offscreenCanvas, 150,25, 127,127,255,255, "150,25", "127,127,255,255", 3);

t.done();

});
done();
