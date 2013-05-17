function testResultCallbackHandler(event) {
    if (event.data == "done") {
        done();
        return;
    }
    if (event.data.type == "is") {
        test(function() { assert_equals(event.data.got, event.data.expected, event.data.msg); });
        return;
    }
    if (event.data.type == "ok") {
        test(function() { assert_true(event.data.bool, event.data.msg); });
        return;
    }
}

window.addEventListener("message", testResultCallbackHandler);

// Setting up testharness.js
setup({ explicit_done: true, timeout: 30 * 1000 });

// Abort test execution if an individual test case fails.
add_result_callback(function (t) {
    if (t.status == t.FAIL)
        done();
});
