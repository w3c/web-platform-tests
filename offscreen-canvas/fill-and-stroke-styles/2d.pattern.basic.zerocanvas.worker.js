// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.pattern.basic.zerocanvas
// Description:
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

offscreenCanvas.width = 0;
offscreenCanvas.height = 10;
_assertSame(offscreenCanvas.width, 0, "offscreenCanvas.width", "0");
_assertSame(offscreenCanvas.height, 10, "offscreenCanvas.height", "10");
assert_throws_dom("INVALID_STATE_ERR", function() { ctx.createPattern(offscreenCanvas, 'repeat'); });
offscreenCanvas.width = 10;
offscreenCanvas.height = 0;
_assertSame(offscreenCanvas.width, 10, "offscreenCanvas.width", "10");
_assertSame(offscreenCanvas.height, 0, "offscreenCanvas.height", "0");
assert_throws_dom("INVALID_STATE_ERR", function() { ctx.createPattern(offscreenCanvas, 'repeat'); });
offscreenCanvas.width = 0;
offscreenCanvas.height = 0;
_assertSame(offscreenCanvas.width, 0, "offscreenCanvas.width", "0");
_assertSame(offscreenCanvas.height, 0, "offscreenCanvas.height", "0");
assert_throws_dom("INVALID_STATE_ERR", function() { ctx.createPattern(offscreenCanvas, 'repeat'); });
t.done();

});
done();
