// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.draw.space.collapse.nonspace
// Description:Non-space characters are not converted to U+0020 and collapsed
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Non-space characters are not converted to U+0020 and collapsed");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.font = '50px CanvasTest';
new Promise(function(resolve) { step_timeout(resolve, 500); })
  .then(function() {
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.fillStyle = '#0f0';
    ctx.fillText('E\x0b EE', -150, 37.5);
    _assertPixelApprox(offscreenCanvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
    _assertPixelApprox(offscreenCanvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }).then(t_pass, t_fail);

});
done();
