function assert_is_unit(unit, result) {
  assert_class_string(result, 'CSSUnitValue',
    'relative lengths must compute to a CSSUnitValue');
  assert_equals(result.unit, unit, 'unit');
}

function assert_is_calc_sum(result) {
  assert_class_string(result, 'CSSMathSum',
    'specified calc must be a CSSMathSum');
}

function assert_is_equal_with_range_handling(input, result) {
  if (input instanceof CSSUnitValue && input.value < 0)
    assert_style_value_equals(result, new CSSMathSum(input));
  else
    assert_style_value_equals(result, input);
}

const gCssWideKeywordsExamples = [
  {
    description: 'initial keyword',
    input: new CSSKeywordValue('initial')
  },
  {
    description: 'inherit keyword',
    input: new CSSKeywordValue('initial')
  },
  {
    description: 'unset keyword',
    input: new CSSKeywordValue('initial')
  },
];

const gTestSyntaxExamples = {
  '<length>': {
    description: 'a length',
    examples: [
      {
        description: "zero px",
        input: new CSSUnitValue(0, 'px')
      },
      {
        description: "a negative em",
        input: new CSSUnitValue(-3.14, 'em'),
        // 'ems' are relative units, so just check that it computes to px
        defaultComputed: (_, result) => assert_is_unit('px', result)
      },
      {
        description: "a positive cm",
        input: new CSSUnitValue(3.14, 'cm'),
        // 'cms' are relative units, so just check that it computes to px
        defaultComputed: (_, result) => assert_is_unit('px', result)
      },
      {
        description: "a calc length",
        input: new CSSMathSum(new CSSUnitValue(0, 'px'), new CSSUnitValue(0, 'em')),
        // Specified/computed calcs are usually simplified.
        // FIXME: Test this properly
        defaultSpecified: (_, result) => assert_is_calc_sum(result),
        defaultComputed: (_, result) => assert_is_unit('px', result)
      }
    ],
  },
  '<percentage>': {
    description: 'a percent',
    examples: [
      {
        description: "zero percent",
        input: new CSSUnitValue(0, 'percent')
      },
      {
        description: "a negative percent",
        input: new CSSUnitValue(-3.14, 'percent')
      },
      {
        description: "a positive percent",
        input: new CSSUnitValue(3.14, 'percent')
      },
      {
        description: "a calc percent",
        input: new CSSMathSum(new CSSUnitValue(0, 'percent'), new CSSUnitValue(0, 'percent')),
        // Specified/computed calcs are usually simplified.
        // FIXME: Test this properly
        defaultSpecified: (_, result) => assert_is_calc_sum(result),
        defaultComputed: (_, result) => assert_is_unit('percent', result)
      }
    ],
  },
  '<time>': {
    description: 'a time',
    examples: [
      {
        description: "zero seconds",
        input: new CSSUnitValue(0, 's')
      },
      {
        description: "negative milliseconds",
        input: new CSSUnitValue(-3.14, 'ms')
      },
      {
        description: "positive seconds",
        input: new CSSUnitValue(3.14, 's')
      },
      {
        description: "a calc time",
        input: new CSSMathSum(new CSSUnitValue(0, 's'), new CSSUnitValue(0, 'ms')),
        // Specified/computed calcs are usually simplified.
        // FIXME: Test this properly
        defaultSpecified: (_, result) => assert_is_calc_sum(result),
        defaultComputed: (_, result) => assert_is_unit('s', result)
      }
    ],
  },
  '<number>': {
    description: 'a number',
    examples: [
      {
        description: 'the number zero',
        input: new CSSUnitValue(0, 'number')
      },
      {
        description: 'a negative number',
        input: new CSSUnitValue(-3.14, 'number')
      },
      {
        description: 'a positive number',
        input: new CSSUnitValue(3.14, 'number')
      },
      {
        description: "a calc number",
        input: new CSSMathSum(new CSSUnitValue(2, 'number'), new CSSUnitValue(3, 'number')),
        defaultSpecified: (_, result) => assert_is_calc_sum(result),
        defaultComputed: (_, result) => {
          assert_style_value_equals(result, new CSSUnitValue(5, 'number'));
        }
      }
    ],
  },
  '<position>': {
    description: 'a position',
    examples: [
      {
        decription: "origin position",
        input: new CSSPositionValue(new CSSUnitValue(0, 'px'), new CSSUnitValue(0, 'px'))
      }
    ],
  },
  '<image>': {
    description: 'an image',
    examples: [
      {
        description: "a PNG image",
        input: new CSSURLImageValue('/media/1x1.png'),
        defaultComputed: (_, result) => {
          // URLs compute to absolute URLs
          assert_true(result instanceof CSSURLImageValue,
            'Computed value should be a CSSURLImageValue');
          assert_true(result.url.endsWith('/media/1x1.png'),
            'Computed value should be an absolute URL');
        }
      }
    ],
  },
  '<transform>': {
    description: 'a transform',
    examples: [
      {
        description: 'a transform containing only a translate',
        input: new CSSTransformValue([
          new CSSTranslate(
            new CSSUnitValue(0, 'px'),
            new CSSUnitValue(1, 'px'),
            new CSSUnitValue(2, 'px'),
          )
        ]),
      }
    ],
  },
};

// Test setting a value in a style map and then getting it from the inline and
// computed styles.
function testPropertyValid(propertyName, examples, specified, computed, description) {
  test(t => {
    let element = createDivWithStyle(t);

    for (const example of examples) {
      element.attributeStyleMap.set(propertyName, example.input);

      // specified style
      const specifiedResult = element.attributeStyleMap.get(propertyName);
      assert_not_equals(specifiedResult, null,
        'Specified value must not be null');
      assert_true(specifiedResult instanceof CSSStyleValue,
        'Specified value must be a CSSStyleValue');

      if (specified || example.defaultSpecified) {
        (specified || example.defaultSpecified)(example.input, specifiedResult);
      } else {
        assert_style_value_equals(specifiedResult, example.input,
          `Setting ${example.description} and getting its specified value`);
      }

      // computed style
      const computedResult = element.computedStyleMap().get(propertyName);
      assert_not_equals(computedResult, null,
        'Computed value must not be null');
      assert_true(computedResult instanceof CSSStyleValue,
        'Computed value must be a CSSStyleValue');

      if (computed || example.defaultComputed) {
        (computed || example.defaultComputed)(example.input, computedResult);
      } else {
        assert_style_value_equals(computedResult, example.input,
          `Setting ${example.description} and getting its computed value`);
      }
    }
  }, `Can set '${propertyName}' to ${description}`);
}

// Test that styleMap.set throws for invalid values
function testPropertyInvalid(propertyName, examples, description) {
  test(t => {
    let styleMap = createInlineStyleMap(t);
    for (const example of examples) {
      assert_throws(new TypeError(), () => styleMap.set(propertyName, example.input));
    }
  }, `Setting '${propertyName}' to ${description} throws TypeError`);
}

// Test that styleMap.get/.set roundtrips correctly for unsupported values.
function testUnsupportedValue(propertyName, cssText) {
  test(t => {
    let element1 = createDivWithStyle(t);
    let element2 = createDivWithStyle(t);

    element1.style[propertyName] = cssText;
    const result = element1.attributeStyleMap.get(propertyName);
    assert_not_equals(result, null,
      'Unsupported value must not be null');
    assert_class_string(result, 'CSSStyleValue',
      'Unsupported value must be a CSSStyleValue and not one of its subclasses');

    element2.attributeStyleMap.set(propertyName, result);
    assert_equals(element2.style[propertyName], element1.style[propertyName],
      'Unsupported value can be set on different element');
  }, `'${propertyName}' does not supported '${cssText}'`);
}

function createKeywordExample(keyword) {
  return {
    description: `the '${keyword}' keyword`,
    examples: [ { input: new CSSKeywordValue(keyword) } ]
  };
}

// Run a battery of StylePropertyMap tests on |propertyName|.
// Second argument is a list of test cases. A test case has the form:
//
// {
//   syntax: "<length>",
//   specified: /* a callback */ (optional)
//   computed: /* a callback */ (optional)
// }
//
// If a callback is passed to |specified|, then the callback will be passed
// two arguments:
// 1. The input test case
// 2. The result of calling get() on the inline style map (specified values).
//
// The callback should check if the result is expected using assert_* functions.
// If no callback is passed, then we assert that the result is the same as
// the input.
//
// Same goes for |computed|, but with the computed style map (computed values).
//
// FIXME: The reason we pass argument #2 is that it's sometimes difficult to
// compute exactly what the expected result should be (e.g. browser-specific
// values). Once we can do that, we can remove argument #2 and just return
// the expected result.
function runPropertyTests(propertyName, testCases) {
  let syntaxTested = new Set();

  // Every property should at least support CSS-wide keywords.
  testPropertyValid(propertyName,
    gCssWideKeywordsExamples,
    null, // should be as specified
    () => {}, // could be anything
    'CSS-wide keywords');

  for (const testCase of testCases) {
    // Retrieve test examples for this test case's syntax. If the syntax
    // looks like a keyword, then create an example on the fly.
    const syntaxExamples = testCase.syntax.match(/^[a-z\-]+$/) ?
      createKeywordExample(testCase.syntax) :
      gTestSyntaxExamples[testCase.syntax];

    if (!syntaxExamples)
      throw new Error(`'${testCase.syntax}' is not a valid CSS component`);

    testPropertyValid(propertyName,
      syntaxExamples.examples,
      testCase.specified,
      testCase.computed,
      syntaxExamples.description);

    syntaxTested.add(testCase.syntax);
  }

  // Also test that styleMap.set rejects invalid CSSStyleValues.
  for (const [syntax, syntaxExamples] of Object.entries(gTestSyntaxExamples)) {
    if (!syntaxTested.has(syntax)) {
      testPropertyInvalid(propertyName,
        syntaxExamples.examples,
        syntaxExamples.description);
    }
  }
}

// Check that |propertyName| doesn't "support" examples in |testExamples|.
// |testExamples| is a list of CSS string values. An "unsupported" value
// doesn't have a corresponding Typed OM representation. It normalizes as
// the base CSSStyleValue.
function runUnsupportedPropertyTests(propertyName, testExamples) {
  for (const cssText of testExamples) {
    testUnsupportedValue(propertyName, cssText);
  }
}
