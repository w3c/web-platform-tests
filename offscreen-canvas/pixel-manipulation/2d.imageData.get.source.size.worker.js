// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.get.source.size
// Description:getImageData() returns bigger ImageData for bigger source rectangle
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("getImageData() returns bigger ImageData for bigger source rectangle");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var imgdata1 = ctx.getImageData(0, 0, 10, 10);
var imgdata2 = ctx.getImageData(0, 0, 20, 20);
_assert(imgdata2.width > imgdata1.width, "imgdata2.width > imgdata1.width");
_assert(imgdata2.height > imgdata1.height, "imgdata2.height > imgdata1.height");

t.done();

});
done();
