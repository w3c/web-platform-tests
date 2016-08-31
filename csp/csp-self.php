<?php
$policy_string = "default-src 'self'";
header("Content-Security-Policy: $policy_string");
if($_GET['prefixed'] == 'true') {
	header("X-Content-Security-Policy: $policy_string");
	header("X-Webkit-CSP: $policy_string");

?>
<!doctype html>
<html>
  <head>
    <title>XMLHttpRequest: abort() after send()</title>
    <script src="/resources/testharness.js"></script>
  </head>
  <body>
    <div id="log"></div>
    <script>
      var test = async_test()
      test.step(function() {
        var client = new XMLHttpRequest(),
            control_flag = false,
            result = [],
            expected = [1, 1, 4] // open() -> 1, send() -> 1, abort() -> 4
        client.onreadystatechange = function() {
          test.step(function() {
            result.push(client.readyState)
            if(client.readyState == 4) {
              control_flag = true
              assert_equals(client.responseXML, null)
              assert_equals(client.responseText, "")
              assert_equals(client.status, 0)
              assert_equals(client.statusText, "")
              assert_equals(client.getAllResponseHeaders(), "")
            }
          })
        }
        client.open("GET", "../resources/delay.php?ms=2000", true)
        client.send(null)
        client.abort()
        assert_true(control_flag)
        assert_equals(client.readyState, 0)
        assert_array_equals(result, expected)
        test.done()
      })
    </script>
  </body>
</html>

