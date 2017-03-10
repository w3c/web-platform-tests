// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.object.set
// Description:ImageData.data can be modified
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("ImageData.data can be modified");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var imgdata = ctx.getImageData(0, 0, 10, 10);
imgdata.data[0] = 100;
_assertSame(imgdata.data[0], 100, "imgdata.data[\""+(0)+"\"]", "100");
imgdata.data[0] = 200;
_assertSame(imgdata.data[0], 200, "imgdata.data[\""+(0)+"\"]", "200");

t.done();

});
done();
