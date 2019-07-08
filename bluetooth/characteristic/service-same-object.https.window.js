// META: script=/resources/testharness.js
// META: script=/resources/testharnessreport.js
// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-helpers.js
'use strict';
const test_desc = '[SameObject] test for BluetoothRemoteGATTCharacteristic ' +
    'service.';

bluetooth_test(async () => {
  const {characteristic} = await getMeasurementIntervalCharacteristic();
  assert_equals(characteristic.service, characteristic.service);
}, test_desc);
