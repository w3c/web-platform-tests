// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.put.unaffected
// Description:putImageData() is not affected by context state
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("putImageData() is not affected by context state");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 100, 50)
var imgdata = ctx.getImageData(0, 0, 100, 50);
ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50)
ctx.globalAlpha = 0.1;
ctx.globalCompositeOperation = 'destination-atop';
ctx.shadowColor = '#f00';
ctx.shadowBlur = 1;
ctx.translate(100, 50);
ctx.scale(0.1, 0.1);
ctx.putImageData(imgdata, 0, 0);
_assertPixelApprox(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
t.done();

});
done();
