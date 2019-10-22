// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.path.arc.angle.2
// Description:arc() draws -3pi/2 .. -pi anticlockwise correctly
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("arc() draws -3pi/2 .. -pi anticlockwise correctly");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 100, 50);
ctx.fillStyle = '#f00';
ctx.beginPath();
ctx.moveTo(100, 0);
ctx.arc(100, 0, 150, -3*Math.PI/2, -Math.PI, true);
ctx.fill();
_assertPixel(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

t.done();

});
done();
