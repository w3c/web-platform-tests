// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.transformation.setTransform.multiple
// Description:
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.setTransform(1/2,0, 0,1/2, 0,0);
ctx.setTransform(2,0, 0,2, 0,0);
ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 50, 25);
_assertPixel(offscreenCanvas, 75,35, 0,255,0,255, "75,35", "0,255,0,255");
t.done();

});
done();
