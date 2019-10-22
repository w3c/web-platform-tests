// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.attributes.shadowOffset.invalid
// Description:
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.shadowOffsetX = 1;
ctx.shadowOffsetY = 2;
ctx.shadowOffsetX = Infinity;
ctx.shadowOffsetY = Infinity;
_assertSame(ctx.shadowOffsetX, 1, "ctx.shadowOffsetX", "1");
_assertSame(ctx.shadowOffsetY, 2, "ctx.shadowOffsetY", "2");
ctx.shadowOffsetX = 1;
ctx.shadowOffsetY = 2;
ctx.shadowOffsetX = -Infinity;
ctx.shadowOffsetY = -Infinity;
_assertSame(ctx.shadowOffsetX, 1, "ctx.shadowOffsetX", "1");
_assertSame(ctx.shadowOffsetY, 2, "ctx.shadowOffsetY", "2");
ctx.shadowOffsetX = 1;
ctx.shadowOffsetY = 2;
ctx.shadowOffsetX = NaN;
ctx.shadowOffsetY = NaN;
_assertSame(ctx.shadowOffsetX, 1, "ctx.shadowOffsetX", "1");
_assertSame(ctx.shadowOffsetY, 2, "ctx.shadowOffsetY", "2");

t.done();

});
done();
