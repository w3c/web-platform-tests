// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-test.js
// META: script=/bluetooth/resources/bluetooth-fake-devices.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc = 'getPrimaryServices called before connecting. Reject with ' +
    'NetworkError.';
const expected = new DOMException(
    `Failed to execute 'getPrimaryServices' on 'BluetoothRemoteGATTServer': ` +
    `GATT Server is disconnected. Cannot retrieve services. (Re)connect ` +
    `first with \`device.gatt.connect\`.`,
    'NetworkError');

bluetooth_test(
    () => getDiscoveredHealthThermometerDevice({
            filters: [{services: ['health_thermometer']}],
            optionalServices: ['generic_access']
          })
              .then(
                  ({device}) => assert_promise_rejects_with_message(
                      device.gatt.getPrimaryServices(), expected)),
    test_desc);
