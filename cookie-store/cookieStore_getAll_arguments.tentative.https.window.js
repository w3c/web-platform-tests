'use strict';

promise_test(async testCase => {
  await cookieStore.set('cookie-name', 'cookie-value');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name');
  });
  await cookieStore.set('cookie-name-2', 'cookie-value-2');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name-2');
  });

  const cookies = await cookieStore.getAll();
  cookies.sort((a, b) => a.name.localeCompare(b.name));
  assert_equals(cookies.length, 2);
  assert_equals(cookies[0].name, 'cookie-name');
  assert_equals(cookies[0].value, 'cookie-value');
  assert_equals(cookies[1].name, 'cookie-name-2');
  assert_equals(cookies[1].value, 'cookie-value-2');
}, 'cookieStore.getAll with no arguments');

promise_test(async testCase => {
  await cookieStore.set('cookie-name', 'cookie-value');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name');
  });
  await cookieStore.set('cookie-name-2', 'cookie-value-2');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name-2');
  });

  const cookies = await cookieStore.getAll('cookie-name');
  assert_equals(cookies.length, 1);
  assert_equals(cookies[0].name, 'cookie-name');
  assert_equals(cookies[0].value, 'cookie-value');
}, 'cookieStore.getAll with positional name');

promise_test(async testCase => {
  await cookieStore.set('cookie-name', 'cookie-value');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name');
  });
  await cookieStore.set('cookie-name-2', 'cookie-value-2');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name-2');
  });

  const cookies = await cookieStore.getAll({ name: 'cookie-name' });
  assert_equals(cookies.length, 1);
  assert_equals(cookies[0].name, 'cookie-name');
  assert_equals(cookies[0].value, 'cookie-value');
}, 'cookieStore.getAll with name in options');

promise_test(async testCase => {
  await cookieStore.set('cookie-name', 'cookie-value');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name');
  });
  await cookieStore.set('cookie-name-2', 'cookie-value-2');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name-2');
  });

  const cookies = await cookieStore.getAll('cookie-name',
                                           { name: 'wrong-cookie-name' });
  assert_equals(cookies.length, 1);
  assert_equals(cookies[0].name, 'cookie-name');
  assert_equals(cookies[0].value, 'cookie-value');
}, 'cookieStore.getAll with name in both positional arguments and options');

promise_test(async testCase => {
  await cookieStore.set('cookie-name', 'cookie-value');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name');
  });

  const cookies = await cookieStore.getAll({ name: 'cookie-name',
                                             matchType: 'equals' });
  assert_equals(cookies.length, 1);
  assert_equals(cookies[0].name, 'cookie-name');
  assert_equals(cookies[0].value, 'cookie-value');

  const no_cookies = await cookieStore.getAll(
      'cookie-na', { matchType: 'equals' });
  assert_equals(no_cookies.length, 0);
}, 'cookieStore.getAll with matchType explicitly set to equals');

promise_test(async testCase => {
  await cookieStore.set('cookie-name', 'cookie-value');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name');
  });
  await cookieStore.set('cookie-name-2', 'cookie-value-2');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name-2');
  });

  const cookies = await cookieStore.getAll({ name: 'cookie-name-',
                                             matchType: 'starts-with' });
  assert_equals(cookies.length, 1);
  assert_equals(cookies[0].name, 'cookie-name-2');
  assert_equals(cookies[0].value, 'cookie-value-2');
}, 'cookieStore.getAll with matchType set to starts-with');

promise_test(async testCase => {
  await cookieStore.set('cookie-name', 'cookie-value');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name');
  });
  await cookieStore.set('cookie-name-2', 'cookie-value-2');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name-2');
  });

  await promise_rejects(testCase, new TypeError(), cookieStore.getAll(
      { name: 'cookie-name', matchType: 'invalid' }));
}, 'cookieStore.getAll with invalid matchType');

promise_test(async testCase => {
  await cookieStore.set('cookie-name', 'cookie-value');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name');
  });

  const cookies = await cookieStore.getAll({ matchType: 'equals' });
  assert_equals(cookies.length, 1);
  assert_equals(cookies[0].name, 'cookie-name');
  assert_equals(cookies[0].value, 'cookie-value');
}, 'cookieStore.getAll with matchType set to equals and missing name');

promise_test(async testCase => {
  await cookieStore.set('cookie-name', 'cookie-value');
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name');
  });

  const cookies = await cookieStore.getAll({ matchType: 'starts-with' });
  assert_equals(cookies.length, 1);
  assert_equals(cookies[0].name, 'cookie-name');
  assert_equals(cookies[0].value, 'cookie-value');
}, 'cookieStore.getAll with matchType set to starts-with and missing name');
