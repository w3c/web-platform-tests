// META: script=/resources/testharness.js
// META: script=/resources/testharnessreport.js
// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-helpers.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc = 'disconnect() called during a getPrimaryServices ' +
    'call that fails. Reject with NetworkError.';
const expected = new DOMException(
    'GATT Server is disconnected. Cannot retrieve services. (Re)connect ' +
        'first with `device.gatt.connect`.',
    'NetworkError');
let device;

bluetooth_test(
    () =>
        getEmptyHealthThermometerDevice().then(_ => ({device} = _)).then(() => {
          let promise = assert_promise_rejects_with_message(
              device.gatt.getPrimaryServices(), expected)
          device.gatt.disconnect();
          return promise;
        }),
    test_desc);
