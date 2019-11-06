// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.get.unaffected
// Description:getImageData() is not affected by context state
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("getImageData() is not affected by context state");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 50, 50)
ctx.fillStyle = '#f00';
ctx.fillRect(50, 0, 50, 50)
ctx.save();
ctx.translate(50, 0);
ctx.globalAlpha = 0.1;
ctx.globalCompositeOperation = 'destination-atop';
ctx.shadowColor = '#f00';
ctx.rect(0, 0, 5, 5);
ctx.clip();
var imgdata = ctx.getImageData(0, 0, 50, 50);
ctx.restore();
ctx.putImageData(imgdata, 50, 0);
_assertPixelApprox(offscreenCanvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
_assertPixelApprox(offscreenCanvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);

t.done();

});
done();
