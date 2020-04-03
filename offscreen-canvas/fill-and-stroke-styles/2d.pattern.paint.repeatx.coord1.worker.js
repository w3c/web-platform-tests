// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.pattern.paint.repeatx.coord1
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

ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 100, 50);
var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/images/red-16x16.png');
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function() {
        resolve(xhr.response);
    };
});
promise.then(function(response) {
    createImageBitmap(response).then(bitmap => {
        var pattern = ctx.createPattern(bitmap, 'repeat-x');
        ctx.fillStyle = pattern;
        ctx.translate(0, 16);
        ctx.fillRect(0, -16, 100, 50);
        ctx.fillStyle = '#0f0';
        ctx.fillRect(0, 0, 100, 16);
        _assertPixel(offscreenCanvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
        _assertPixel(offscreenCanvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
        _assertPixel(offscreenCanvas, 1,25, 0,255,0,255, "1,25", "0,255,0,255");
        _assertPixel(offscreenCanvas, 98,25, 0,255,0,255, "98,25", "0,255,0,255");
        _assertPixel(offscreenCanvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
        _assertPixel(offscreenCanvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");
    }, t_fail);
}).then(t_pass, t_fail);

});
done();
