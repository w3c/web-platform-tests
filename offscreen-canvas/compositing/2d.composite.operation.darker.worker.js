// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.composite.operation.darker
// Description:
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.globalCompositeOperation = 'xor';
ctx.globalCompositeOperation = 'darker';
_assertSame(ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

t.done();

});
done();
