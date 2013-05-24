/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_02_03 = {
    name:'A_04_02_03',
    assert:'Lower-boundary encapsulation: ' +
        'The distribution is a result of executing a stable algorithm',
    link:'http://www.w3.org/TR/shadow-dom/#lower-boundary-encapsulation',
    highlight: 'The distribution is a result of executing a stable algorithm'
};

var A_04_02_03_T1 = async_test('A_04_02_03_T01', PROPS(A_04_02_03, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_04_02_03_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_02_03_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = createSR(ul);

            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select=".shadow"></content></ul>';
            s.appendChild(subdiv1);

            //The order of <li> elements at this point should be the following:
            //li3, li6, li11, li12, 1i13, li14, li15. Other elements (li1, li2, li4, li5) invisible
            assert_true(d.querySelector('#li3').offsetTop < d.querySelector('#li6').offsetTop,
                'Point 1: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li6').offsetTop < d.querySelector('#li11').offsetTop,
                'Point 2: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li11').offsetTop < d.querySelector('#li12').offsetTop,
                'Point 3: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li12').offsetTop < d.querySelector('#li13').offsetTop,
                'Point 4: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li13').offsetTop < d.querySelector('#li14').offsetTop,
                'Point 5: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li14').offsetTop < d.querySelector('#li15').offsetTop,
                'Point 6: Elements that mach insertion point criteria don\'t participate in distribution');

            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'Point 7: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                'Point 8: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li4').offsetTop, 0,
                'Point 9: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li5').offsetTop, 0,
                'Point 10: Elements that don\'t mach insertion point criteria participate in distribution');

            var subdiv2 = document.createElement('div');
            subdiv2.innerHTML = '<ul><content select=".shadow2"></content></ul>';
            s.appendChild(subdiv2);

            // When class name changed distribution must reoccur
            //The order of <li> elements should now be the following:
            //li3, li6, li4, li11, li12, 1i13, li14, li15. Invisible: li1, li2, li5
            assert_true(d.querySelector('#li3').offsetTop < d.querySelector('#li6').offsetTop,
                'Point 11: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li6').offsetTop < d.querySelector('#li4').offsetTop,
                'Point 12: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li4').offsetTop < d.querySelector('#li11').offsetTop,
                'Point 13: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li11').offsetTop < d.querySelector('#li12').offsetTop,
                'Point 14: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li12').offsetTop < d.querySelector('#li13').offsetTop,
                'Point 15: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li13').offsetTop < d.querySelector('#li14').offsetTop,
                'Point 16: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li14').offsetTop < d.querySelector('#li15').offsetTop,
                'Point 17: Elements that mach insertion point criteria don\'t participate in distribution');

            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'Point 18: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                'Point 19: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li5').offsetTop, 0,
                'Point 20: Elements that don\'t mach insertion point criteria participate in distribution');

            var subdiv3 = document.createElement('div');
            subdiv3.innerHTML = '<ul><content select=".shadow"></content></ul>';
            s.appendChild(subdiv3);

            //There should be no change. Order:
            //li3, li6, li4, li11, li12, 1i13, li14, li15. Invisible: li1, li2, li5
            assert_true(d.querySelector('#li3').offsetTop < d.querySelector('#li6').offsetTop,
                'Point 21: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li6').offsetTop < d.querySelector('#li4').offsetTop,
                'Point 22: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li4').offsetTop < d.querySelector('#li11').offsetTop,
                'Point 23: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li11').offsetTop < d.querySelector('#li12').offsetTop,
                'Point 24: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li12').offsetTop < d.querySelector('#li13').offsetTop,
                'Point 25: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li13').offsetTop < d.querySelector('#li14').offsetTop,
                'Point 26: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li14').offsetTop < d.querySelector('#li15').offsetTop,
                'Point 27: Elements that mach insertion point criteria don\'t participate in distribution');

            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'Point 28: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                'Point 29: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li5').offsetTop, 0,
                'Point 30: Elements that don\'t mach insertion point criteria participate in distribution');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_02_03_T1.done();
    });
});
