// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.line.miter.invalid
// Description:Setting miterLimit to invalid values is ignored
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Setting miterLimit to invalid values is ignored");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.miterLimit = 1.5;
_assertSame(ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");
ctx.miterLimit = 1.5;
ctx.miterLimit = 0;
_assertSame(ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");
ctx.miterLimit = 1.5;
ctx.miterLimit = -1;
_assertSame(ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");
ctx.miterLimit = 1.5;
ctx.miterLimit = Infinity;
_assertSame(ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");
ctx.miterLimit = 1.5;
ctx.miterLimit = -Infinity;
_assertSame(ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");
ctx.miterLimit = 1.5;
ctx.miterLimit = NaN;
_assertSame(ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");

t.done();

});
done();
