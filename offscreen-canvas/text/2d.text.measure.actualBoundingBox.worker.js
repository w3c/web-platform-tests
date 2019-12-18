// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.measure.actualBoundingBox
// Description:Testing actualBoundingBox for OffscreenCanvas
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Testing actualBoundingBox for OffscreenCanvas");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var f = new FontFace("CanvasTest", "/fonts/CanvasTest.ttf");
let fonts = (self.fonts ? self.fonts : document.fonts);
fonts.add(f);
fonts.ready.then(() => {
    return new Promise(function(resolve) { step_timeout(resolve, 500); });
}).then(function() {
    ctx.font = '50px CanvasTest';
    ctx.direction = 'ltr';
    ctx.align = 'left'
    ctx.baseline = 'alphabetic'
    // Some platforms may return '-0'.
    _assertSame(Math.abs(ctx.measureText('A').actualBoundingBoxLeft), 0, "Math.abs(ctx.measureText('A').actualBoundingBoxLeft)", "0");
    // Different platforms may render text slightly different.
    _assert(ctx.measureText('A').actualBoundingBoxRight >= 50, "ctx.measureText('A').actualBoundingBoxRight >= 50");
    _assert(ctx.measureText('A').actualBoundingBoxAscent >= 35, "ctx.measureText('A').actualBoundingBoxAscent >= 35");
    _assertSame(Math.abs(ctx.measureText('A').actualBoundingBoxDescent), 0, "Math.abs(ctx.measureText('A').actualBoundingBoxDescent)", "0");

    _assertSame(Math.abs(ctx.measureText('ABCD').actualBoundingBoxLeft), 0, "Math.abs(ctx.measureText('ABCD').actualBoundingBoxLeft)", "0");
    _assert(ctx.measureText('ABCD').actualBoundingBoxRight >= 200, "ctx.measureText('ABCD').actualBoundingBoxRight >= 200");
    _assert(ctx.measureText('ABCD').actualBoundingBoxAscent >= 85, "ctx.measureText('ABCD').actualBoundingBoxAscent >= 85");
    _assert(ctx.measureText('ABCD').actualBoundingBoxDescent >= 37, "ctx.measureText('ABCD').actualBoundingBoxDescent >= 37");
}).then(t_pass, t_fail);

});
done();
