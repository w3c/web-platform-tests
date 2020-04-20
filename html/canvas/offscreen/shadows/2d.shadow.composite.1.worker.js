// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.composite.1
// Description:Shadows are drawn using globalCompositeOperation
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Shadows are drawn using globalCompositeOperation");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.globalCompositeOperation = 'xor';
ctx.shadowColor = '#f00';
ctx.shadowOffsetX = 100;
ctx.fillStyle = '#0f0';
ctx.fillRect(-100, 0, 200, 50);
_assertPixelApprox(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
t.done();

});
done();
