// DO NOT EDIT! This test has been generated by /offscreen-canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.drawImage.zerosource.image
// Description:drawImage with zero-sized source rectangle from image throws INDEX_SIZE_ERR
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("drawImage with zero-sized source rectangle from image throws INDEX_SIZE_ERR");
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
    xhr.open("GET", '/images/red-zerowidth.svg');
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function() {
        resolve(xhr.response);
    };
});
promise.then(function(response) {
    createImageBitmap(response).then(bitmap => {
        assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.drawImage(bitmap, 0, 0, 100, 50); });
        assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.drawImage(bitmap, 0, 0, 100, 50); });
        assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.drawImage(bitmap, 0, 0, 100, 50); });
        _assertPixel(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
    }, t_fail);
}).then(t_pass, t_fail);

});
done();
