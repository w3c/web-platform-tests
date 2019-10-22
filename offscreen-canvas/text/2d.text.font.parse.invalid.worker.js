// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.font.parse.invalid
// Description:
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.font = '20px serif';
_assertSame(ctx.font, '20px serif', "ctx.font", "'20px serif'");

ctx.font = '20px serif';
ctx.font = '';
_assertSame(ctx.font, '20px serif', "ctx.font", "'20px serif'");

ctx.font = '20px serif';
ctx.font = 'bogus';
_assertSame(ctx.font, '20px serif', "ctx.font", "'20px serif'");

ctx.font = '20px serif';
ctx.font = 'inherit';
_assertSame(ctx.font, '20px serif', "ctx.font", "'20px serif'");

ctx.font = '20px serif';
ctx.font = '10px {bogus}';
_assertSame(ctx.font, '20px serif', "ctx.font", "'20px serif'");

ctx.font = '20px serif';
ctx.font = '10px initial';
_assertSame(ctx.font, '20px serif', "ctx.font", "'20px serif'");

ctx.font = '20px serif';
ctx.font = '10px default';
_assertSame(ctx.font, '20px serif', "ctx.font", "'20px serif'");

ctx.font = '20px serif';
ctx.font = '10px inherit';
_assertSame(ctx.font, '20px serif', "ctx.font", "'20px serif'");

ctx.font = '20px serif';
ctx.font = '1em serif; background: green; margin: 10px';
_assertSame(ctx.font, '20px serif', "ctx.font", "'20px serif'");

t.done();

});
done();
