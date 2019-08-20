// META: script=/resources/testharness.js
// META: script=/resources/testharnessreport.js
// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-helpers.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
// TODO(https://crbug.com/672127) Use this test case to test the rest of
// characteristic functions.
'use strict';
const test_desc = 'Service is removed. Reject with InvalidStateError.';
const expected =
    new DOMException('GATT Service no longer exists.', 'InvalidStateError');
let characteristic, fake_peripheral, fake_service;

bluetooth_test(
    () => getMeasurementIntervalCharacteristic()
              .then(_ => ({characteristic, fake_peripheral, fake_service} = _))
              .then(() => fake_service.remove())
              .then(() => fake_peripheral.simulateGATTServicesChanged())
              .then(
                  () => assert_promise_rejects_with_message(
                      characteristic.getDescriptors(user_description.name),
                      expected, 'Service got removed.')),
    test_desc);
