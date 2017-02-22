// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.create2.round
// Description:createImageData(w, h) is rounded the same as getImageData(0, 0, w, h)
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("createImageData(w, h) is rounded the same as getImageData(0, 0, w, h)");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var imgdata1 = ctx.createImageData(10.01, 10.99);
var imgdata2 = ctx.getImageData(0, 0, 10.01, 10.99);
_assertSame(imgdata1.width, imgdata2.width, "imgdata1.width", "imgdata2.width");
_assertSame(imgdata1.height, imgdata2.height, "imgdata1.height", "imgdata2.height");

t.done();

});
done();
