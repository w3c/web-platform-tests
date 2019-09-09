// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-helpers.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc = 'Service is removed before getCharacteristics call. ' +
    'Reject with InvalidStateError.';
const expected =
    new DOMException('GATT Service no longer exists.', 'InvalidStateError');
let service, fake_service, fake_peripheral;

bluetooth_test(
    () => getHealthThermometerService()
              .then(_ => ({service, fake_service, fake_peripheral} = _))
              .then(() => fake_service.remove())
              .then(() => fake_peripheral.simulateGATTServicesChanged())
              .then(
                  () => assert_promise_rejects_with_message(
                      service.getCharacteristics('measurement_interval'),
                      expected, 'Service got removed.')),
    test_desc);
