// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.path.isPointInPath.transform.1
// Description:isPointInPath() handles transformations correctly
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("isPointInPath() handles transformations correctly");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.translate(50, 0);
ctx.rect(0, 0, 20, 20);
_assertSame(ctx.isPointInPath(-40, 10), false, "ctx.isPointInPath(-40, 10)", "false");
_assertSame(ctx.isPointInPath(10, 10), false, "ctx.isPointInPath(10, 10)", "false");
_assertSame(ctx.isPointInPath(49, 10), false, "ctx.isPointInPath(49, 10)", "false");
_assertSame(ctx.isPointInPath(51, 10), true, "ctx.isPointInPath(51, 10)", "true");
_assertSame(ctx.isPointInPath(69, 10), true, "ctx.isPointInPath(69, 10)", "true");
_assertSame(ctx.isPointInPath(71, 10), false, "ctx.isPointInPath(71, 10)", "false");
t.done();

});
done();
