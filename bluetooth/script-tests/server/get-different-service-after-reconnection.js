'use strict';
const test_desc = 'Calls to FUNCTION_NAME after a disconnection should return ' +
    'a different object.';
let device, services_first_connection, services_second_connection;

bluetooth_test(() => getHealthThermometerDevice({
      filters: [{services: ['health_thermometer']}],
      optionalServices: ['generic_access']
    })
    .then(_ => ({device} = _))
    .then(() => device.gatt.CALLS([
      getPrimaryService('health_thermometer')|
      getPrimaryServices()|
      getPrimaryServices('health_thermometer')[UUID]]))
    .then(services => services_first_connection = services)
    .then(() => device.gatt.disconnect())
    .then(() => device.gatt.connect())
    .then(() => device.gatt.PREVIOUS_CALL)
    .then(services => services_second_connection = services)
    .then(() => {
      // Convert to arrays if necessary.
      services_first_connection = [].concat(services_first_connection);
      services_second_connection = [].concat(services_second_connection);

      assert_equals(services_first_connection.length,
          services_second_connection.length);

      let first_connection_set = new Set(services_first_connection);
      let second_connection_set = new Set(services_second_connection);

      // The two sets should be disjoint.
      let common_services = services_first_connection.filter(
          val => second_connection_set.has(val));
      assert_equals(common_services.length, 0);
    }), test_desc);
