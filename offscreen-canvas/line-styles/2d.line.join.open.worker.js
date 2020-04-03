// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.line.join.open
// Description:Line joins are not drawn at the corner of an unclosed rectangle
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Line joins are not drawn at the corner of an unclosed rectangle");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#0f0';
ctx.strokeStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.lineJoin = 'miter';
ctx.lineWidth = 200;
ctx.beginPath();
ctx.moveTo(100, 50);
ctx.lineTo(100, 1000);
ctx.lineTo(1000, 1000);
ctx.lineTo(1000, 50);
ctx.lineTo(100, 50);
ctx.stroke();
_assertPixel(offscreenCanvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
_assertPixel(offscreenCanvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
_assertPixel(offscreenCanvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
_assertPixel(offscreenCanvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
t.done();

});
done();
