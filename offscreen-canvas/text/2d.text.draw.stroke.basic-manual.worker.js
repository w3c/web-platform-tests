// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.draw.stroke.basic
// Description:strokeText draws stroked text
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("strokeText draws stroked text");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, 100, 50);
ctx.strokeStyle = '#0f0';
ctx.fillStyle = '#f00';
ctx.lineWidth = 1;
ctx.font = '35px Arial, sans-serif';
ctx.strokeText('PASS', 5, 35);

t.done();

});
done();
