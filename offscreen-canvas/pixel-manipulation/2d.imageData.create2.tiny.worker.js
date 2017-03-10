// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.create2.tiny
// Description:createImageData(sw, sh) works for sizes smaller than one pixel
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("createImageData(sw, sh) works for sizes smaller than one pixel");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var imgdata = ctx.createImageData(0.0001, 0.0001);
_assertSame(imgdata.data.length, imgdata.width*imgdata.height*4, "imgdata.data.length", "imgdata.width*imgdata.height*4");
_assertSame(imgdata.width, 1, "imgdata.width", "1");
_assertSame(imgdata.height, 1, "imgdata.height", "1");
var isTransparentBlack = true;
for (var i = 0; i < imgdata.data.length; ++i)
    if (imgdata.data[i] !== 0)
        isTransparentBlack = false;
_assert(isTransparentBlack, "isTransparentBlack");

t.done();

});
done();
