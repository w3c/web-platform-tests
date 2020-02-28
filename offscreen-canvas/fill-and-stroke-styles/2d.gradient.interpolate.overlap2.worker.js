// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.gradient.interpolate.overlap2
// Description:
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var g = ctx.createLinearGradient(0, 0, 100, 0);
var ps = [ 0, 1/10, 1/4, 1/3, 1/2, 3/4, 1 ];
for (var p = 0; p < ps.length; ++p)
{
        g.addColorStop(ps[p], '#0f0');
        for (var i = 0; i < 15; ++i)
                g.addColorStop(ps[p], '#f00');
        g.addColorStop(ps[p], '#0f0');
}
ctx.fillStyle = g;
ctx.fillRect(0, 0, 100, 50);
_assertPixel(offscreenCanvas, 1,25, 0,255,0,255, "1,25", "0,255,0,255");
_assertPixel(offscreenCanvas, 30,25, 0,255,0,255, "30,25", "0,255,0,255");
_assertPixel(offscreenCanvas, 40,25, 0,255,0,255, "40,25", "0,255,0,255");
_assertPixel(offscreenCanvas, 60,25, 0,255,0,255, "60,25", "0,255,0,255");
_assertPixel(offscreenCanvas, 80,25, 0,255,0,255, "80,25", "0,255,0,255");
t.done();

});
done();
