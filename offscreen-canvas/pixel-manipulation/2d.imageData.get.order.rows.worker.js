// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.get.order.rows
// Description:getImageData() returns topmost rows first
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("getImageData() returns topmost rows first");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, 100, 50);
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, 100, 2);
var imgdata = ctx.getImageData(0, 0, 10, 10);
_assertSame(imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");
_assertSame(imgdata.data[Math.floor(imgdata.width/2*4)], 0, "imgdata.data[Math.floor(imgdata.width/2*4)]", "0");
_assertSame(imgdata.data[(imgdata.height/2)*imgdata.width*4], 255, "imgdata.data[(imgdata.height/2)*imgdata.width*4]", "255");
t.done();

});
done();
