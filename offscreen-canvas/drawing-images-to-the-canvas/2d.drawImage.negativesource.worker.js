// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.drawImage.negativesource
// Description:Negative source width/height represents the correct rectangle
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Negative source width/height represents the correct rectangle");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/images/ggrr-256x256.png');
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function() {
        resolve(xhr.response);
    };
});
promise.then(function(response) {
    createImageBitmap(response).then(bitmap => {
        ctx.drawImage(bitmap, 100, 78, -100, 50, 0, 0, 50, 50);
        ctx.drawImage(bitmap, 100, 128, -100, -50, 50, 0, 50, 50);
        _assertPixelApprox(offscreenCanvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255", 2);
        _assertPixelApprox(offscreenCanvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255", 2);
        _assertPixelApprox(offscreenCanvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255", 2);
        _assertPixelApprox(offscreenCanvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255", 2);
        _assertPixelApprox(offscreenCanvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255", 2);
        _assertPixelApprox(offscreenCanvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255", 2);
        _assertPixelApprox(offscreenCanvas, 51,1, 0,255,0,255, "51,1", "0,255,0,255", 2);
        _assertPixelApprox(offscreenCanvas, 51,48, 0,255,0,255, "51,48", "0,255,0,255", 2);
        _assertPixelApprox(offscreenCanvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
        _assertPixelApprox(offscreenCanvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
    }, t_fail);
}).then(t_pass, t_fail);

});
done();
