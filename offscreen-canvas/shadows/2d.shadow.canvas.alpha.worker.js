// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.canvas.alpha
// Description:Shadows are drawn correctly for partially-transparent canvases
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Shadows are drawn correctly for partially-transparent canvases");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var offscreenCanvas2 = new OffscreenCanvas(100, 50);
var ctx2 = offscreenCanvas2.getContext('2d');
ctx2.fillStyle = 'rgba(255, 0, 0, 0.5)';
ctx2.fillRect(0, 0, 100, 50);
ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.shadowOffsetY = 50;
ctx.shadowColor = '#00f';
ctx.drawImage(offscreenCanvas2, 0, -50);
_assertPixelApprox(offscreenCanvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255");
t.done();

});
done();
