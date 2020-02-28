// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.attributes.shadowBlur.valid
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

ctx.shadowBlur = 1;
_assertSame(ctx.shadowBlur, 1, "ctx.shadowBlur", "1");
ctx.shadowBlur = 0.5;
_assertSame(ctx.shadowBlur, 0.5, "ctx.shadowBlur", "0.5");
ctx.shadowBlur = 1e6;
_assertSame(ctx.shadowBlur, 1e6, "ctx.shadowBlur", "1e6");
ctx.shadowBlur = 0;
_assertSame(ctx.shadowBlur, 0, "ctx.shadowBlur", "0");
t.done();

});
done();
