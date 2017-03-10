// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.composite.globalAlpha.imagepattern
// Description:
// Note:

importScripts("/resources/testharness.js");
importScripts("/common/canvas-tests.js");

var t = async_test("");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 100, 50);
var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/images/red.png');
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function() {
        resolve(xhr.response);
    };
});
promise.then(function(response) {
    ctx.fillStyle = ctx.createPattern(response, 'no-repeat');
    ctx.globalAlpha = 0.01; // avoid any potential alpha=0 optimisations
    ctx.fillRect(0, 0, 100, 50);
    _assertPixelApprox(offscreenCanvas, 50,25, 2,253,0,255, "50,25", "2,253,0,255", 2);
});

t.done();

});
done();
