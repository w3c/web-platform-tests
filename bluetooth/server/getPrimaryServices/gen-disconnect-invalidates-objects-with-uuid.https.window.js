// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-helpers.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc = 'Calls on services after we disconnect and connect again. ' +
    'Should reject with InvalidStateError.';
let device, services;

function createDOMException(func, uuid) {
  return new DOMException(
      `Failed to execute '${func}' on 'BluetoothRemoteGATTService': ` +
      `Service with UUID ${uuid} is no longer valid. Remember to retrieve ` +
      `the service again after reconnecting.`,
      'InvalidStateError');
}

bluetooth_test(
    () => getHealthThermometerDevice(
              {filters: [{services: ['health_thermometer']}]})
              .then(_ => ({device} = _))
              .then(() => device.gatt.getPrimaryServices('health_thermometer'))
              // Convert to array if necessary.
              .then(s => services = [].concat(s))
              .then(() => device.gatt.disconnect())
              .then(() => device.gatt.connect())
              .then(() => {
                let promises = Promise.resolve();
                for (let service of services) {
                  promises = promises.then(
                      () => assert_promise_rejects_with_message(
                          service.getCharacteristic('measurement_interval'),
                          createDOMException('getCharacteristic', service.uuid)));
                  promises = promises.then(
                      () => assert_promise_rejects_with_message(
                          service.getCharacteristics(),
                          createDOMException('getCharacteristics', service.uuid)));
                  promises = promises.then(
                      () => assert_promise_rejects_with_message(
                          service.getCharacteristics('measurement_interval'),
                          createDOMException('getCharacteristics', service.uuid)));
                }
                return promises;
              }),
    test_desc);
