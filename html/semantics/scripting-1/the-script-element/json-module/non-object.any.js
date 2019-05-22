// META: global=window,worker

for (const value of [null, true, false, "string"]) {
  promise_test(async t => {
    const result = await import(`./${value}.json`);
    assert_equals(result, value);
  }, `Non-object: ${value}`);
}

promise_test(async t => {
  const result = await import("./array.json");
  assert_array_equals(result, ["en", "try"]);
}, "Non-object: array");

