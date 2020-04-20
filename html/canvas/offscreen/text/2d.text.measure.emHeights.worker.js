// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.measure.emHeights
// Description:Testing emHeights for OffscreenCanvas
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Testing emHeights for OffscreenCanvas");
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
    ctx.direction = 'ltr';
    ctx.align = 'left'
    _assertSame(ctx.measureText('A').emHeightAscent, 37.5, "ctx.measureText('A').emHeightAscent", "37.5");
    _assertSame(ctx.measureText('A').emHeightDescent, 12.5, "ctx.measureText('A').emHeightDescent", "12.5");
    _assertSame(ctx.measureText('A').emHeightDescent + ctx.measureText('A').emHeightAscent, 50, "ctx.measureText('A').emHeightDescent + ctx.measureText('A').emHeightAscent", "50");

    _assertSame(ctx.measureText('ABCD').emHeightAscent, 37.5, "ctx.measureText('ABCD').emHeightAscent", "37.5");
    _assertSame(ctx.measureText('ABCD').emHeightDescent, 12.5, "ctx.measureText('ABCD').emHeightDescent", "12.5");
    _assertSame(ctx.measureText('ABCD').emHeightDescent + ctx.measureText('ABCD').emHeightAscent, 50, "ctx.measureText('ABCD').emHeightDescent + ctx.measureText('ABCD').emHeightAscent", "50");
}).then(t_pass, t_fail);

});
done();
