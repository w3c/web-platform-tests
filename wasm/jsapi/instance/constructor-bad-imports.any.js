// META: global=jsshell
// META: script=/wasm/jsapi/wasm-constants.js
// META: script=/wasm/jsapi/wasm-module-builder.js
// META: script=/wasm/jsapi/bad-imports.js

test_bad_imports((name, error, build, ...arguments) => {
  test(() => {
    const builder = new WasmModuleBuilder();
    build(builder);
    const buffer = builder.toBuffer();
    const module = new WebAssembly.Module(buffer);
    assert_throws(error, () => new WebAssembly.Instance(module, ...arguments));
  }, `new WebAssembly.Instance(module): ${name}`);
});
