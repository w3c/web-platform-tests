// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.line.join.valid
// Description:Setting lineJoin to valid values works
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Setting lineJoin to valid values works");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
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
