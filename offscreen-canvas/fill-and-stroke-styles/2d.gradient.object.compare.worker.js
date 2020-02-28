// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.gradient.object.compare
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

var g1 = ctx.createLinearGradient(0, 0, 100, 0);
var g2 = ctx.createLinearGradient(0, 0, 100, 0);
_assertDifferent(g1, g2, "g1", "g2");
ctx.fillStyle = g1;
_assertSame(ctx.fillStyle, g1, "ctx.fillStyle", "g1");
t.done();

});
done();
