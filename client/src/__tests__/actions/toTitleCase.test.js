import toTitleCase from '../../actions/toTitleCase';

it('Tests conversion of all lowercase string with space to title case', () => {
  let testName = 'test runner';

  testName = toTitleCase(testName);

  expect(testName).toBe('Test Runner');
});

it('Tests conversion of all lowercase string without space to title case', () => {
  let testName = 'testrunner';

  testName = toTitleCase(testName);

  expect(testName).toBe('Testrunner');
});

it('Tests conversion of all uppercase string with space to title case', () => {
  let testName = 'TEST RUNNER';

  testName = toTitleCase(testName);

  expect(testName).toBe('Test Runner');
});

it('Tests conversion of all uppercase string without space to title case', () => {
  let testName = 'TESTRUNNER';

  testName = toTitleCase(testName);

  expect(testName).toBe('Testrunner');
});

it('Tests conversion of mixed case string with space to title case', () => {
  let testName = 'TeSt RuNnEr';

  testName = toTitleCase(testName);

  expect(testName).toBe('Test Runner');
});

it('Tests conversion of mixed case string without space to title case', () => {
  let testName = 'TeStRuNnEr';

  testName = toTitleCase(testName);

  expect(testName).toBe('Testrunner');
});
