// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-helpers.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc = 'Request for absent characteristics with UUID. ' +
    'Reject with NotFoundError.';

bluetooth_test(
    () => getEmptyHealthThermometerService().then(
        ({service}) => assert_promise_rejects_with_message(
            service.getCharacteristics('battery_level'),
            new DOMException(
                `No Characteristics matching UUID ${
                    battery_level.uuid} found ` +
                    `in Service with UUID ${health_thermometer.uuid}.`,
                'NotFoundError'))),
    test_desc);
