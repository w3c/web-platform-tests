// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.pattern.transparent.1
// Description:Shadows are not drawn for transparent fill patterns
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Shadows are not drawn for transparent fill patterns");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/images/transparent.png');
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function() {
        resolve(xhr.response);
    };
});
promise.then(function(response) {
    var pattern = ctx.createPattern(response, 'repeat');
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowColor = '#f00';
    ctx.shadowOffsetY = 50;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, -50, 100, 50);
}).then(t_pass, t_fail);

});
done();
