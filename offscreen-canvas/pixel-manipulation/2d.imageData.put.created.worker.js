// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.put.created
// Description:putImageData() puts image data from createImageData() onto the canvas
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("putImageData() puts image data from createImageData() onto the canvas");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
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
_assertPixelApprox(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
t.done();

});
done();
