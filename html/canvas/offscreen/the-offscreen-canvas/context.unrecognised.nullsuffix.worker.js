// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:context.unrecognised.nullsuffix
// Description:Context name "2d" plus a "\0" suffix is unrecognised
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Context name \"2d\" plus a \"\\0\" suffix is unrecognised");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var offscreenCanvas2 = new OffscreenCanvas(100, 50);
assert_throws_js(TypeError, function() { offscreenCanvas2.getContext("2d\0"); });
t.done();

});
done();
