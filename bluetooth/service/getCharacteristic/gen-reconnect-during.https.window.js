// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-test.js
// META: script=/bluetooth/resources/bluetooth-fake-devices.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc = 'disconnect() and connect() called during ' +
    'getCharacteristic. Reject with NetworkError.';
const expected = new DOMException(
    'GATT Server is disconnected. Cannot retrieve characteristics. ' +
        '(Re)connect first with `device.gatt.connect`.',
    'NetworkError');
let device;

bluetooth_test(
    () =>
        getHealthThermometerDeviceWithServicesDiscovered({
          filters: [{services: [health_thermometer.name]}],
        })
            .then(_ => ({device} = _))
            .then(() => device.gatt.getPrimaryService(health_thermometer.name))
            .then(service => Promise.all([
              // 1. Make a call to service.getCharacteristic, while the service
              // is still valid.
              assert_promise_rejects_with_message(
                  service.getCharacteristic(measurement_interval.name),
                  expected),

              // 2. disconnect() and connect before the initial call completes.
              // This is accomplished by making the calls without waiting for
              // the earlier promises to resolve. connect() guarantees on
              // OS-level connection, but disconnect() only disconnects the
              // current instance.
              // getHealthThermometerDeviceWithServicesDiscovered holds another
              // connection in an iframe, so disconnect() and connect() are
              // certain to reconnect.  However, disconnect() will invalidate
              // the service object so the subsequent calls made to it will
              // fail, even after reconnecting.
              device.gatt.disconnect(), device.gatt.connect()
            ])),
    test_desc);
