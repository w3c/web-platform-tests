// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.drawImage.zerosource
// Description:drawImage with zero-sized source rectangle throws INDEX_SIZE_ERR
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("drawImage with zero-sized source rectangle throws INDEX_SIZE_ERR");
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
    xhr.open("GET", '/images/green.png');
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function() {
        resolve(xhr.response);
    };
});
promise.then(function(response) {
    createImageBitmap(response).then(bitmap => {
        assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.drawImage(bitmap, 10, 10, 0, 1, 0, 0, 100, 50); });
        assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.drawImage(bitmap, 10, 10, 1, 0, 0, 0, 100, 50); });
        assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.drawImage(bitmap, 10, 10, 0, 0, 0, 0, 100, 50); });
        _assertPixelApprox(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
    }, t_fail);
}).then(t_pass, t_fail);

});
done();
