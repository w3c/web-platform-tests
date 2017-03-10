// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.put.created
// Description:putImageData() puts image data from createImageData() onto the canvas
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("putImageData() puts image data from createImageData() onto the canvas");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var imgdata = ctx.createImageData(100, 50);
for (var i = 0; i < imgdata.data.length; i += 4) {
    imgdata.data[i] = 0;
    imgdata.data[i+1] = 255;
    imgdata.data[i+2] = 0;
    imgdata.data[i+3] = 255;
}
ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50)
ctx.putImageData(imgdata, 0, 0);
_assertPixelApprox(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

t.done();

});
done();
