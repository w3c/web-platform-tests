// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.alpha.3
// Description:Shadows are affected by globalAlpha
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Shadows are affected by globalAlpha");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.fillStyle = '#f00'; // (work around broken Firefox globalAlpha caching)
ctx.shadowColor = '#00f';
ctx.shadowOffsetY = 50;
ctx.globalAlpha = 0.5;
ctx.fillRect(0, -50, 100, 50);
_assertPixelApprox(offscreenCanvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);
t.done();

});
done();
