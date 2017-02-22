// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.state.saverestore.shadowOffsetY
// Description:save()/restore() works for shadowOffsetY
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("save()/restore() works for shadowOffsetY");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

// Test that restore() undoes any modifications
var old = ctx.shadowOffsetY;
ctx.save();
ctx.shadowOffsetY = 5;
ctx.restore();
_assertSame(ctx.shadowOffsetY, old, "ctx.shadowOffsetY", "old");

// Also test that save() doesn't modify the values
ctx.shadowOffsetY = 5;
old = ctx.shadowOffsetY;
    // we're not interested in failures caused by get(set(x)) != x (e.g.
    // from rounding), so compare against 'old' instead of against 5
ctx.save();
_assertSame(ctx.shadowOffsetY, old, "ctx.shadowOffsetY", "old");
ctx.restore();

t.done();

});
done();
