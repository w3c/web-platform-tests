// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.transformation.transform.3d
// Description:transform() with 4x4 matrix concatenates properly
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("transform() with 4x4 matrix concatenates properly");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

const transform = new DOMMatrix([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
ctx.transform(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
let canvasTransform = ctx.getTransform();
_assert(transform.toLocaleString() == canvasTransform.toLocaleString(), "transform.toLocaleString() == canvasTransform.toLocaleString()");
ctx.transform(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
canvasTransform = ctx.getTransform();
transform.multiplySelf(transform);
_assert(transform.toLocaleString() == canvasTransform.toLocaleString(), "transform.toLocaleString() == canvasTransform.toLocaleString()");
t.done();

});
done();
