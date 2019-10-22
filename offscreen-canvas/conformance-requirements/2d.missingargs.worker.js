// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.missingargs
// Description:Missing arguments cause TypeError
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Missing arguments cause TypeError");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

assert_throws(new TypeError(), function() { ctx.scale(); });
assert_throws(new TypeError(), function() { ctx.scale(1); });
assert_throws(new TypeError(), function() { ctx.rotate(); });
assert_throws(new TypeError(), function() { ctx.translate(); });
assert_throws(new TypeError(), function() { ctx.translate(0); });
if (ctx.transform) { // (avoid spurious failures, since the aim here is not to test that all features are supported)
    assert_throws(new TypeError(), function() { ctx.transform(); });
    assert_throws(new TypeError(), function() { ctx.transform(1); });
    assert_throws(new TypeError(), function() { ctx.transform(1, 0); });
    assert_throws(new TypeError(), function() { ctx.transform(1, 0, 0); });
    assert_throws(new TypeError(), function() { ctx.transform(1, 0, 0, 1); });
    assert_throws(new TypeError(), function() { ctx.transform(1, 0, 0, 1, 0); });
}
if (ctx.setTransform) {
    assert_throws(new TypeError(), function() { ctx.setTransform(); });
    assert_throws(new TypeError(), function() { ctx.setTransform(1); });
    assert_throws(new TypeError(), function() { ctx.setTransform(1, 0); });
    assert_throws(new TypeError(), function() { ctx.setTransform(1, 0, 0); });
    assert_throws(new TypeError(), function() { ctx.setTransform(1, 0, 0, 1); });
    assert_throws(new TypeError(), function() { ctx.setTransform(1, 0, 0, 1, 0); });
}
assert_throws(new TypeError(), function() { ctx.createLinearGradient(); });
assert_throws(new TypeError(), function() { ctx.createLinearGradient(0); });
assert_throws(new TypeError(), function() { ctx.createLinearGradient(0, 0); });
assert_throws(new TypeError(), function() { ctx.createLinearGradient(0, 0, 1); });
assert_throws(new TypeError(), function() { ctx.createRadialGradient(); });
assert_throws(new TypeError(), function() { ctx.createRadialGradient(0); });
assert_throws(new TypeError(), function() { ctx.createRadialGradient(0, 0); });
assert_throws(new TypeError(), function() { ctx.createRadialGradient(0, 0, 1); });
assert_throws(new TypeError(), function() { ctx.createRadialGradient(0, 0, 1, 0); });
assert_throws(new TypeError(), function() { ctx.createRadialGradient(0, 0, 1, 0, 0); });
assert_throws(new TypeError(), function() { ctx.createPattern(offscreenCanvas); });
assert_throws(new TypeError(), function() { ctx.clearRect(); });
assert_throws(new TypeError(), function() { ctx.clearRect(0); });
assert_throws(new TypeError(), function() { ctx.clearRect(0, 0); });
assert_throws(new TypeError(), function() { ctx.clearRect(0, 0, 0); });
assert_throws(new TypeError(), function() { ctx.fillRect(); });
assert_throws(new TypeError(), function() { ctx.fillRect(0); });
assert_throws(new TypeError(), function() { ctx.fillRect(0, 0); });
assert_throws(new TypeError(), function() { ctx.fillRect(0, 0, 0); });
assert_throws(new TypeError(), function() { ctx.strokeRect(); });
assert_throws(new TypeError(), function() { ctx.strokeRect(0); });
assert_throws(new TypeError(), function() { ctx.strokeRect(0, 0); });
assert_throws(new TypeError(), function() { ctx.strokeRect(0, 0, 0); });
assert_throws(new TypeError(), function() { ctx.moveTo(); });
assert_throws(new TypeError(), function() { ctx.moveTo(0); });
assert_throws(new TypeError(), function() { ctx.lineTo(); });
assert_throws(new TypeError(), function() { ctx.lineTo(0); });
assert_throws(new TypeError(), function() { ctx.quadraticCurveTo(); });
assert_throws(new TypeError(), function() { ctx.quadraticCurveTo(0); });
assert_throws(new TypeError(), function() { ctx.quadraticCurveTo(0, 0); });
assert_throws(new TypeError(), function() { ctx.quadraticCurveTo(0, 0, 0); });
assert_throws(new TypeError(), function() { ctx.bezierCurveTo(); });
assert_throws(new TypeError(), function() { ctx.bezierCurveTo(0); });
assert_throws(new TypeError(), function() { ctx.bezierCurveTo(0, 0); });
assert_throws(new TypeError(), function() { ctx.bezierCurveTo(0, 0, 0); });
assert_throws(new TypeError(), function() { ctx.bezierCurveTo(0, 0, 0, 0); });
assert_throws(new TypeError(), function() { ctx.bezierCurveTo(0, 0, 0, 0, 0); });
assert_throws(new TypeError(), function() { ctx.arcTo(); });
assert_throws(new TypeError(), function() { ctx.arcTo(0); });
assert_throws(new TypeError(), function() { ctx.arcTo(0, 0); });
assert_throws(new TypeError(), function() { ctx.arcTo(0, 0, 0); });
assert_throws(new TypeError(), function() { ctx.arcTo(0, 0, 0, 0); });
assert_throws(new TypeError(), function() { ctx.rect(); });
assert_throws(new TypeError(), function() { ctx.rect(0); });
assert_throws(new TypeError(), function() { ctx.rect(0, 0); });
assert_throws(new TypeError(), function() { ctx.rect(0, 0, 0); });
assert_throws(new TypeError(), function() { ctx.arc(); });
assert_throws(new TypeError(), function() { ctx.arc(0); });
assert_throws(new TypeError(), function() { ctx.arc(0, 0); });
assert_throws(new TypeError(), function() { ctx.arc(0, 0, 1); });
assert_throws(new TypeError(), function() { ctx.arc(0, 0, 1, 0); });
assert_throws(new TypeError(), function() { ctx.drawImage(); });
assert_throws(new TypeError(), function() { ctx.drawImage(offscreenCanvas); });
assert_throws(new TypeError(), function() { ctx.drawImage(offscreenCanvas, 0); });
// TODO: n >= 3 args on drawImage could be either a valid overload,
// or too few for another overload, or too many for another
// overload - what should happen?
if (ctx.createImageData) {
    assert_throws(new TypeError(), function() { ctx.createImageData(); });
    assert_throws(new TypeError(), function() { ctx.createImageData(1); });
}
if (ctx.getImageData) {
    assert_throws(new TypeError(), function() { ctx.getImageData(); });
    assert_throws(new TypeError(), function() { ctx.getImageData(0); });
    assert_throws(new TypeError(), function() { ctx.getImageData(0, 0); });
    assert_throws(new TypeError(), function() { ctx.getImageData(0, 0, 1); });
}
if (ctx.putImageData) {
    var imgdata = ctx.getImageData(0, 0, 1, 1);
    assert_throws(new TypeError(), function() { ctx.putImageData(); });
    assert_throws(new TypeError(), function() { ctx.putImageData(imgdata); });
    assert_throws(new TypeError(), function() { ctx.putImageData(imgdata, 0); });
}
var g = ctx.createLinearGradient(0, 0, 0, 0);
assert_throws(new TypeError(), function() { g.addColorStop(); });
assert_throws(new TypeError(), function() { g.addColorStop(0); });

t.done();

});
done();
