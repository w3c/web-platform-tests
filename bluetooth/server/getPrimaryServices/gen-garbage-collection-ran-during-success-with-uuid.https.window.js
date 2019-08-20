// META: script=/resources/testharness.js
// META: script=/resources/testharnessreport.js
// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-helpers.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc =
    'Garbage Collection ran during a getPrimaryServices call that ' +
    'succeeds. Should not crash.';
const expected = new DOMException(
    'GATT Server is disconnected. Cannot retrieve services. ' +
        '(Re)connect first with `device.gatt.connect`.',
    'NetworkError');
let promise;

bluetooth_test(
    () => getHealthThermometerDevice(
              {filters: [{services: ['health_thermometer']}]})
              .then(({device}) => {
                promise = assert_promise_rejects_with_message(
                    device.gatt.getPrimaryServices('health_thermometer'),
                    expected);
                device.gatt.disconnect();
                return runGarbageCollection();
              })
              .then(() => promise),
    test_desc);
