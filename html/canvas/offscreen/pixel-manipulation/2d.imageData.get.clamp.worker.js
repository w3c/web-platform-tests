// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.get.clamp
// Description:getImageData() clamps colours to the range [0, 255]
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("getImageData() clamps colours to the range [0, 255]");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = 'rgb(-100, -200, -300)';
ctx.fillRect(0, 0, 100, 50);
ctx.fillStyle = 'rgb(256, 300, 400)';
ctx.fillRect(20, 10, 60, 10);
var imgdata1 = ctx.getImageData(10, 5, 1, 1);
_assertSame(imgdata1.data[0], 0, "imgdata1.data[\""+(0)+"\"]", "0");
_assertSame(imgdata1.data[1], 0, "imgdata1.data[\""+(1)+"\"]", "0");
_assertSame(imgdata1.data[2], 0, "imgdata1.data[\""+(2)+"\"]", "0");
var imgdata2 = ctx.getImageData(30, 15, 1, 1);
_assertSame(imgdata2.data[0], 255, "imgdata2.data[\""+(0)+"\"]", "255");
_assertSame(imgdata2.data[1], 255, "imgdata2.data[\""+(1)+"\"]", "255");
_assertSame(imgdata2.data[2], 255, "imgdata2.data[\""+(2)+"\"]", "255");
t.done();

});
done();
