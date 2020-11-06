// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.drawing.style.textRendering.settings
// Description:Testing basic functionalities of textRendering in Canvas
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Testing basic functionalities of textRendering in Canvas");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

// Setting textRendering with lower cases
_assertSame(ctx.textRendering, "Auto", "ctx.textRendering", "\"Auto\"");

ctx.textRendering = "auto";
_assertSame(ctx.textRendering, "Auto", "ctx.textRendering", "\"Auto\"");

ctx.textRendering = "optimizespeed";
_assertSame(ctx.textRendering, "OptimizeSpeed", "ctx.textRendering", "\"OptimizeSpeed\"");

ctx.textRendering = "optimizelegibility";
_assertSame(ctx.textRendering, "OptimizeLegibility", "ctx.textRendering", "\"OptimizeLegibility\"");

ctx.textRendering = "geometricprecision";
_assertSame(ctx.textRendering, "GeometricPrecision", "ctx.textRendering", "\"GeometricPrecision\"");

// Setting textRendering with lower cases and upper cases word.
ctx.textRendering = "aUto";
_assertSame(ctx.textRendering, "Auto", "ctx.textRendering", "\"Auto\"");

ctx.textRendering = "OPtimizeSpeed";
_assertSame(ctx.textRendering, "OptimizeSpeed", "ctx.textRendering", "\"OptimizeSpeed\"");

ctx.textRendering = "OPtimizELEgibility";
_assertSame(ctx.textRendering, "OptimizeLegibility", "ctx.textRendering", "\"OptimizeLegibility\"");

ctx.textRendering = "GeometricPrecision";
_assertSame(ctx.textRendering, "GeometricPrecision", "ctx.textRendering", "\"GeometricPrecision\"");

// Setting textRendering with non-existing font variant.
ctx.textRendering = "abcd";
_assertSame(ctx.textRendering, "GeometricPrecision", "ctx.textRendering", "\"GeometricPrecision\"");
t.done();

});
done();
