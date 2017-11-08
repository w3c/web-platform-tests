promise_test(() => {
  return fetch("/XMLHttpRequest/resources/echo-headers.py", {headers: [["THIS-is-A-test", 1], ["THIS-IS-A-TEST", 2]] }).then(res => res.text()).then(body => {
    assert_regexp_match(body, /THIS-is-A-test: 1, 2/)
  })
}, "Multiple headers with the same name, different case")

