/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

"use strict";

// Epsilon value for assert_approx_equals(). Used for time measurements
var TIME_EPSILON = 5;
// Precision (in px) for expected style at the moment and the one returned by getComputedStyle()
var COMPUTED_STYLE_EPSILON = 5;

var ANIMATION_DURATION = 1000;
var ANIMATION_TOP_DEFAULT = 300;
var ANIMATION_TOP_0 = 10;
var ANIMATION_TOP_0_5 = 100;
var ANIMATION_TOP_1 = 200;

var KEYFRAMES = [ {
    top : ANIMATION_TOP_0 + 'px',
    offset : 0
}, {
    top : ANIMATION_TOP_0_5 + 'px',
    offset : 1 / 2
}, {
    top : ANIMATION_TOP_1 + 'px',
    offset : 1
} ];

// Creates and returns new HTML document
function newHTMLDocument() {
    return document.implementation.createHTMLDocument('Test Document');
}

// creates div element, appends it to the document body and
// add removing of the created element to test cleanup
function createDiv(test, doc) {
    if (!doc) {
        doc = document;
    }
    var div = doc.createElement('div');
    doc.body.appendChild(div);
    div.style.top = ANIMATION_TOP_DEFAULT + 'px';
    test.add_cleanup(function() {
        removeElement(div);
    });
    return div;
}

// Removes element
function removeElement(element) {
    element.parentNode.removeChild(element);
}

// Returns the type name of given object
function type(object) {
    return Object.prototype.toString.call(object).slice(8, -1);
}

//Returns expected top of the target element at currentTime
function getExpectedTop(currentTime, iterationDuration) {
    if (!iterationDuration) {
        iterationDuration = ANIMATION_DURATION;
    }
    var iterationFraction = (currentTime / iterationDuration) % 1;
    if (iterationFraction <= 0.5) {
        return ANIMATION_TOP_0 + (ANIMATION_TOP_0_5 - ANIMATION_TOP_0) *
            iterationFraction * 2;
    } else {
        return ANIMATION_TOP_0_5 + (ANIMATION_TOP_1 - ANIMATION_TOP_0_5) *
            (iterationFraction - 0.5) * 2;
    }
}
