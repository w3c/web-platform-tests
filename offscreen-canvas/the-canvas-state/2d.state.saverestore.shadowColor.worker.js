// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.state.saverestore.shadowColor
// Description:save()/restore() works for shadowColor
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("save()/restore() works for shadowColor");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

// Test that restore() undoes any modifications
var old = ctx.shadowColor;
ctx.save();
ctx.shadowColor = "#ff0000";
ctx.restore();
_assertSame(ctx.shadowColor, old, "ctx.shadowColor", "old");

// Also test that save() doesn't modify the values
ctx.shadowColor = "#ff0000";
old = ctx.shadowColor;
    // we're not interested in failures caused by get(set(x)) != x (e.g.
    // from rounding), so compare against 'old' instead of against "#ff0000"
ctx.save();
_assertSame(ctx.shadowColor, old, "ctx.shadowColor", "old");
ctx.restore();

t.done();

});
done();
