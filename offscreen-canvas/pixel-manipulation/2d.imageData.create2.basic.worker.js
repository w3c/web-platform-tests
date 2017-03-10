// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.create2.basic
// Description:createImageData(sw, sh) exists and returns something
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("createImageData(sw, sh) exists and returns something");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

_assertDifferent(ctx.createImageData(1, 1), null, "ctx.createImageData(1, 1)", "null");

t.done();

});
done();
