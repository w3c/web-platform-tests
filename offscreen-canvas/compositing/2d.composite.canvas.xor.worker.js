// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.composite.canvas.xor
// Description:
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');


var offscreenCanvas2 = new OffscreenCanvas(offscreenCanvas.width, offscreenCanvas.height);
var ctx2 = offscreenCanvas2.getContext('2d');
var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/images/yellow75.png');
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function() {
        resolve(xhr.response);
    };
});
promise.then(function(response) {
    ctx2.drawImage(response, 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'xor';
    ctx.drawImage(offscreenCanvas2, 0, 0);
    _assertPixelApprox(offscreenCanvas, 50,25, 191,255,64,128, "50,25", "191,255,64,128", 5);
});

t.done();

});
done();
