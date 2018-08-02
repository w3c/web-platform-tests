// META: global=window,worker
// META: script=/resources/WebIDLParser.js
// META: script=/resources/idlharness.js

'use strict';

// https://w3c.github.io/hr-time/

function cast(i, t) {
  return Object.assign(i, Object.create(t));
}

idl_test(
  ['hr-time'],
  ['html', 'dom'],
  async idl_array => {
    if (self.GLOBAL.isWorker()) {
      idl_array.add_objects({ WorkerGlobalScope: ['self'] });
    } else {
      idl_array.add_objects({ Window: ['self'] });
    }
    idl_array.add_objects({
      Performance: ['performance'],
    });
  },
  'hr-time interfaces.');
