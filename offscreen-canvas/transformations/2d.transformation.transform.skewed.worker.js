// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.transformation.transform.skewed
// Description:transform() with skewy matrix transforms correctly
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("transform() with skewy matrix transforms correctly");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

// Create green with a red square ring inside it
ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 100, 50);
ctx.fillStyle = '#f00';
ctx.fillRect(20, 10, 60, 30);
ctx.fillStyle = '#0f0';
ctx.fillRect(40, 20, 20, 10);
// Draw a skewed shape to fill that gap, to make sure it is aligned correctly
ctx.transform(1,4, 2,3, 5,6);
// Post-transform coordinates:
//   [[20,10],[80,10],[80,40],[20,40],[20,10],[40,20],[40,30],[60,30],[60,20],[40,20],[20,10]];
// Hence pre-transform coordinates:
var pts=[[-7.4,11.2],[-43.4,59.2],[-31.4,53.2],[4.6,5.2],[-7.4,11.2],
         [-15.4,25.2],[-11.4,23.2],[-23.4,39.2],[-27.4,41.2],[-15.4,25.2],
         [-7.4,11.2]];
ctx.beginPath();
ctx.moveTo(pts[0][0], pts[0][1]);
for (var i = 0; i < pts.length; ++i)
    ctx.lineTo(pts[i][0], pts[i][1]);
ctx.fill();
_assertPixel(offscreenCanvas, 21,11, 0,255,0,255, "21,11", "0,255,0,255");
_assertPixel(offscreenCanvas, 79,11, 0,255,0,255, "79,11", "0,255,0,255");
_assertPixel(offscreenCanvas, 21,39, 0,255,0,255, "21,39", "0,255,0,255");
_assertPixel(offscreenCanvas, 79,39, 0,255,0,255, "79,39", "0,255,0,255");
_assertPixel(offscreenCanvas, 39,19, 0,255,0,255, "39,19", "0,255,0,255");
_assertPixel(offscreenCanvas, 61,19, 0,255,0,255, "61,19", "0,255,0,255");
_assertPixel(offscreenCanvas, 39,31, 0,255,0,255, "39,31", "0,255,0,255");
_assertPixel(offscreenCanvas, 61,31, 0,255,0,255, "61,31", "0,255,0,255");
t.done();

});
done();
