// DO NOT EDIT! This test has been generated by tools/gentest.py.
importScripts("/resources/testharness.js");
importScripts("/resources/testharnessreport.js");
importScripts("/common/canvas-tests.js");

var t = async_test("");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.globalCompositeOperation = 'xor';
ctx.globalCompositeOperation = 'over';
_assertSame(ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

t.done();

});
done();
