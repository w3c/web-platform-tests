import {areArraysEqual} from '/common/arrays.js';

registerLayout('test', class {
  static get inputProperties() {
    return [ '--child-expected'];
  }

  static get childInputProperties() {
    return [ '--child' ];
  }

  *intrinsicSizes() {}
  *layout(children, edges, constraints, styleMap) {
    const expected = JSON.parse(styleMap.get('--child-expected').toString());
    const actual = children.map((child) => {
      return child.styleMap.get('--child').toString().trim();
    });

    const childFragments = yield children.map((child) => { return child.layoutNextFragment({}); });

    if (!areArraysEqual(expected, actual))
      return {autoBlockSize: 0, childFragments};

    return {autoBlockSize: 100, childFragments};
  }
});
