// META: script=/resources/testharness.js
// META: script=/resources/testharnessreport.js
// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-helpers.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc = 'Request for present service without permission to access ' +
    'any service. Reject with SecurityError.';
const expected = new DOMException(
    'Origin is not allowed to access any service. Tip: Add the service ' +
        'UUID to \'optionalServices\' in requestDevice() options. ' +
        'https://goo.gl/HxfxSQ',
    'SecurityError');

bluetooth_test(
    () => getConnectedHealthThermometerDevice({acceptAllDevices: true})
              .then(
                  ({device}) => assert_promise_rejects_with_message(
                      device.gatt.getPrimaryService('heart_rate'), expected)),
    test_desc);
