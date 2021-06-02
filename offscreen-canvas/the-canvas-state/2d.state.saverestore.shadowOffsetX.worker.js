// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.state.saverestore.shadowOffsetX
// Description:save()/restore() works for shadowOffsetX
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("save()/restore() works for shadowOffsetX");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

// Test that restore() undoes any modifications
var old = ctx.shadowOffsetX;
ctx.save();
ctx.shadowOffsetX = 5;
ctx.restore();
_assertSame(ctx.shadowOffsetX, old, "ctx.shadowOffsetX", "old");

// Also test that save() doesn't modify the values
ctx.shadowOffsetX = 5;
old = ctx.shadowOffsetX;
    // we're not interested in failures caused by get(set(x)) != x (e.g.
    // from rounding), so compare against 'old' instead of against 5
ctx.save();
_assertSame(ctx.shadowOffsetX, old, "ctx.shadowOffsetX", "old");
ctx.restore();
t.done();

});
done();
