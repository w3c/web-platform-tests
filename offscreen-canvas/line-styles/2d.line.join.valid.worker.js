// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.line.join.valid
// Description:Setting lineJoin to valid values works
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Setting lineJoin to valid values works");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.lineJoin = 'bevel'
_assertSame(ctx.lineJoin, 'bevel', "ctx.lineJoin", "'bevel'");
ctx.lineJoin = 'round';
_assertSame(ctx.lineJoin, 'round', "ctx.lineJoin", "'round'");
ctx.lineJoin = 'miter';
_assertSame(ctx.lineJoin, 'miter', "ctx.lineJoin", "'miter'");

t.done();

});
done();
