// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.draw.align.center
// Description:textAlign center is the center of the em squares (not the bounding box)
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("textAlign center is the center of the em squares (not the bounding box)");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var f = new FontFace("CanvasTest", "url('/fonts/CanvasTest.ttf')");
let fonts = (self.fonts ? self.fonts : document.fonts);
f.load();
fonts.add(f);
fonts.ready.then(function() {
    ctx.font = '50px CanvasTest';
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.fillStyle = '#0f0';
    ctx.textAlign = 'center';
    ctx.fillText('DD', 50, 37.5);
    _assertPixelApprox(offscreenCanvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
    _assertPixelApprox(offscreenCanvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
    _assertPixelApprox(offscreenCanvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
    _assertPixelApprox(offscreenCanvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
    _assertPixelApprox(offscreenCanvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
    _assertPixelApprox(offscreenCanvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }).then(t_pass, t_fail);

});
done();
