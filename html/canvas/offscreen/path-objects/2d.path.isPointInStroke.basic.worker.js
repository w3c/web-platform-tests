// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.path.isPointInStroke.basic
// Description:detects whether point is in the area contained by the stroke of the path
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("detects whether point is in the area contained by the stroke of the path");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.strokeStyle = '#0f0';
ctx.beginPath();
ctx.rect(0, 0, 20, 20);
_assertSame(ctx.isPointInStroke(0, 0), true, "ctx.isPointInStroke(0, 0)", "true");
_assertSame(ctx.isPointInStroke(30, 10), false, "ctx.isPointInStroke(30, 10)", "false");

var path = new Path2D();
path.rect(20, 20, 100, 100);
_assertSame(ctx.isPointInStroke(path, 20, 20), true, "ctx.isPointInStroke(path, 20, 20)", "true");
_assertSame(ctx.isPointInStroke(path, 120, 20), true, "ctx.isPointInStroke(path, 120, 20)", "true");
t.done();

});
done();
