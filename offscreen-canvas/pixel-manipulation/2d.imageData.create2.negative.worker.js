// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.create2.negative
// Description:createImageData(sw, sh) takes the absolute magnitude of the size arguments
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("createImageData(sw, sh) takes the absolute magnitude of the size arguments");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var imgdata1 = ctx.createImageData(10, 20);
var imgdata2 = ctx.createImageData(-10, 20);
var imgdata3 = ctx.createImageData(10, -20);
var imgdata4 = ctx.createImageData(-10, -20);
_assertSame(imgdata1.data.length, imgdata2.data.length, "imgdata1.data.length", "imgdata2.data.length");
_assertSame(imgdata2.data.length, imgdata3.data.length, "imgdata2.data.length", "imgdata3.data.length");
_assertSame(imgdata3.data.length, imgdata4.data.length, "imgdata3.data.length", "imgdata4.data.length");

t.done();

});
done();
