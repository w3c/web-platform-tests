// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.measure.width.space
// Description:Space characters are converted to U+0020 and collapsed (per CSS)
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("Space characters are converted to U+0020 and collapsed (per CSS)");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

deferTest();
step_timeout(t.step_func_done(function () {
    ctx.font = '50px CanvasTest';
    _assertSame(ctx.measureText('A B').width, 150, "ctx.measureText('A B').width", "150");
    _assertSame(ctx.measureText('A  B').width, 150, "ctx.measureText('A  B').width", "150");
    _assertSame(ctx.measureText('A \x09\x0a\x0c\x0d  \x09\x0a\x0c\x0dB').width, 150, "ctx.measureText('A \\x09\\x0a\\x0c\\x0d  \\x09\\x0a\\x0c\\x0dB').width", "150");
    _assert(ctx.measureText('A \x0b B').width >= 200, "ctx.measureText('A \\x0b B').width >= 200");

    _assertSame(ctx.measureText(' AB').width, 100, "ctx.measureText(' AB').width", "100");
    _assertSame(ctx.measureText('AB ').width, 100, "ctx.measureText('AB ').width", "100");
}), 500);

t.done();

});
done();
