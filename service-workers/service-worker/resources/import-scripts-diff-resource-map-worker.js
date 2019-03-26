importScripts('/resources/testharness.js');

let echo1 = null;
    echo2 = null;
    arg1 = 'import-scripts-get.py?output=echo1&msg=test1';
    arg2 = 'import-scripts-get.py?output=echo2&msg=test2';

importScripts(arg1, arg2);
assert_equals(echo1, 'test1');
assert_equals(echo2, 'test2');
