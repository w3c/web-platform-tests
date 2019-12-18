// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.path.stroke.overlap
// Description:Stroked subpaths are combined before being drawn
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Stroked subpaths are combined before being drawn");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, 100, 50);
ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
ctx.lineWidth = 50;
ctx.moveTo(0, 20);
ctx.lineTo(100, 20);
ctx.moveTo(0, 30);
ctx.lineTo(100, 30);
ctx.stroke();
_assertPixelApprox(offscreenCanvas, 50,25, 0,127,0,255, "50,25", "0,127,0,255", 1);
t.done();

});
done();
