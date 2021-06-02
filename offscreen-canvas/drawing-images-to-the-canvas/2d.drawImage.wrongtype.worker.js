// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.drawImage.wrongtype
// Description:Incorrect image types in drawImage do not match any defined overloads, so WebIDL throws a TypeError
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Incorrect image types in drawImage do not match any defined overloads, so WebIDL throws a TypeError");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

assert_throws(new TypeError(), function() { ctx.drawImage(undefined, 0, 0); });
assert_throws(new TypeError(), function() { ctx.drawImage(0, 0, 0); });
assert_throws(new TypeError(), function() { ctx.drawImage("", 0, 0); });
t.done();

});
done();
