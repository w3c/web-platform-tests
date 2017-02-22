// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.voidreturn
// Description:void methods return undefined
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("void methods return undefined");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

_assertSame(ctx.save(), undefined, "ctx.save()", "undefined");
_assertSame(ctx.restore(), undefined, "ctx.restore()", "undefined");
_assertSame(ctx.scale(1, 1), undefined, "ctx.scale(1, 1)", "undefined");
_assertSame(ctx.rotate(0), undefined, "ctx.rotate(0)", "undefined");
_assertSame(ctx.translate(0, 0), undefined, "ctx.translate(0, 0)", "undefined");
if (ctx.transform) { // (avoid spurious failures, since the aim here is not to test that all features are supported)
    _assertSame(ctx.transform(1, 0, 0, 1, 0, 0), undefined, "ctx.transform(1, 0, 0, 1, 0, 0)", "undefined");
}
if (ctx.setTransform) {
    _assertSame(ctx.setTransform(1, 0, 0, 1, 0, 0), undefined, "ctx.setTransform(1, 0, 0, 1, 0, 0)", "undefined");
}
_assertSame(ctx.clearRect(0, 0, 0, 0), undefined, "ctx.clearRect(0, 0, 0, 0)", "undefined");
_assertSame(ctx.fillRect(0, 0, 0, 0), undefined, "ctx.fillRect(0, 0, 0, 0)", "undefined");
_assertSame(ctx.strokeRect(0, 0, 0, 0), undefined, "ctx.strokeRect(0, 0, 0, 0)", "undefined");
_assertSame(ctx.beginPath(), undefined, "ctx.beginPath()", "undefined");
_assertSame(ctx.closePath(), undefined, "ctx.closePath()", "undefined");
_assertSame(ctx.moveTo(0, 0), undefined, "ctx.moveTo(0, 0)", "undefined");
_assertSame(ctx.lineTo(0, 0), undefined, "ctx.lineTo(0, 0)", "undefined");
_assertSame(ctx.quadraticCurveTo(0, 0, 0, 0), undefined, "ctx.quadraticCurveTo(0, 0, 0, 0)", "undefined");
_assertSame(ctx.bezierCurveTo(0, 0, 0, 0, 0, 0), undefined, "ctx.bezierCurveTo(0, 0, 0, 0, 0, 0)", "undefined");
_assertSame(ctx.arcTo(0, 0, 0, 0, 1), undefined, "ctx.arcTo(0, 0, 0, 0, 1)", "undefined");
_assertSame(ctx.rect(0, 0, 0, 0), undefined, "ctx.rect(0, 0, 0, 0)", "undefined");
_assertSame(ctx.arc(0, 0, 1, 0, 0, true), undefined, "ctx.arc(0, 0, 1, 0, 0, true)", "undefined");
_assertSame(ctx.fill(), undefined, "ctx.fill()", "undefined");
_assertSame(ctx.stroke(), undefined, "ctx.stroke()", "undefined");
_assertSame(ctx.clip(), undefined, "ctx.clip()", "undefined");
if (ctx.putImageData) {
    _assertSame(ctx.putImageData(ctx.getImageData(0, 0, 1, 1), 0, 0), undefined, "ctx.putImageData(ctx.getImageData(0, 0, 1, 1), 0, 0)", "undefined");
}
_assertSame(ctx.drawImage(offscreenCanvas, 0, 0, 1, 1, 0, 0, 0, 0), undefined, "ctx.drawImage(offscreenCanvas, 0, 0, 1, 1, 0, 0, 0, 0)", "undefined");
_assertSame(ctx.createLinearGradient(0, 0, 0, 0).addColorStop(0, 'white'), undefined, "ctx.createLinearGradient(0, 0, 0, 0).addColorStop(0, 'white')", "undefined");

t.done();

});
done();
