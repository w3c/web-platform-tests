// META: global=jsshell

test(() => {
  const argument = { "value": "i32" };
  const thisValues = [
    undefined,
    null,
    true,
    "",
    Symbol(),
    1,
    {},
    WebAssembly.Global,
    WebAssembly.Global.prototype,
  ];

  const fn = WebAssembly.Global.prototype.valueOf;

  for (const thisValue of thisValues) {
    assert_throws(new TypeError(), () => fn.call(thisValue), `this=${format_value(thisValue)}`);
  }
}, "Branding");
