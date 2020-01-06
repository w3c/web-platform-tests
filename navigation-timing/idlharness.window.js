// META: script=/resources/WebIDLParser.js
// META: script=/resources/idlharness.js

'use strict';

// http://www.w3.org/TR/navigation-timing/

idl_test(
  ['hr-time', 'navigation-timing'],
  ['resource-timing', 'performance-timeline', 'html', 'dom'],
  idl_array => {
    idl_array.add_objects({
      Performance: ['performance'],
      PerformanceNavigation: ['performance.navigation'],
      PerformanceTiming: ['performance.timing'],
      PerformanceNavigationTiming: [
        'performance.getEntriesByType("navigation")[0]'
      ]
    });
  }
);
