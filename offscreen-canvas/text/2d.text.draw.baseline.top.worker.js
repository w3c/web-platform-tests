// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.draw.baseline.top
// Description:textBaseline top is the top of the em square (not the bounding box)
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("textBaseline top is the top of the em square (not the bounding box)");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.font = '50px CanvasTest';
deferTest();
step_timeout(t.step_func_done(function () {
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.fillStyle = '#0f0';
    ctx.textBaseline = 'top';
    ctx.fillText('CC', 0, 0);
    _assertPixelApprox(offscreenCanvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
    _assertPixelApprox(offscreenCanvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
    _assertPixelApprox(offscreenCanvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
    _assertPixelApprox(offscreenCanvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
    _assertPixelApprox(offscreenCanvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
    _assertPixelApprox(offscreenCanvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
}), 500);

t.done();

});
done();
