// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.gradient.linear.nonfinite
// Description:createLinearGradient() throws TypeError if arguments are not finite
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("createLinearGradient() throws TypeError if arguments are not finite");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

assert_throws_js(TypeError, function() { ctx.createLinearGradient(Infinity, 0, 1, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(-Infinity, 0, 1, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(NaN, 0, 1, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, Infinity, 1, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, -Infinity, 1, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, NaN, 1, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, 0, Infinity, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, 0, -Infinity, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, 0, NaN, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, 0, 1, Infinity); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, 0, 1, -Infinity); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, 0, 1, NaN); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(Infinity, Infinity, 1, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(Infinity, Infinity, Infinity, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(Infinity, Infinity, Infinity, Infinity); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(Infinity, Infinity, 1, Infinity); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(Infinity, 0, Infinity, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(Infinity, 0, Infinity, Infinity); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(Infinity, 0, 1, Infinity); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, Infinity, Infinity, 0); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, Infinity, Infinity, Infinity); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, Infinity, 1, Infinity); });
assert_throws_js(TypeError, function() { ctx.createLinearGradient(0, 0, Infinity, Infinity); });
t.done();

});
done();
