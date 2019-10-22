// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.put.dirty.rect1
// Description:putImageData() only modifies areas inside the dirty rectangle, using width and height
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("putImageData() only modifies areas inside the dirty rectangle, using width and height");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50)
ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 20, 20)
var imgdata = ctx.getImageData(0, 0, 100, 50);
ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 100, 50)
ctx.fillStyle = '#f00';
ctx.fillRect(40, 20, 20, 20)
ctx.putImageData(imgdata, 40, 20, 0, 0, 20, 20);
_assertPixelApprox(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
_assertPixelApprox(offscreenCanvas, 35,25, 0,255,0,255, "35,25", "0,255,0,255", 2);
_assertPixelApprox(offscreenCanvas, 65,25, 0,255,0,255, "65,25", "0,255,0,255", 2);
_assertPixelApprox(offscreenCanvas, 50,15, 0,255,0,255, "50,15", "0,255,0,255", 2);
_assertPixelApprox(offscreenCanvas, 50,45, 0,255,0,255, "50,45", "0,255,0,255", 2);

t.done();

});
done();
