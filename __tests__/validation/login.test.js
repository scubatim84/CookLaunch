import validateLoginInput from '../../validation/login.js';

describe('Test validateLoginInput function', () => {
  test('Returns error and invalid if email empty', async () => {
    const mockData = {
      email: '',
      password: 'tester',
    };

    const res = await validateLoginInput(mockData);

    expect(res.error).not.toBeNull();
    expect(res.isValid).toBe(false);
  });

  test('Returns error and invalid if password empty', async () => {
    const mockData = {
      email: 'test@runner.com',
      password: '',
    };

    const res = await validateLoginInput(mockData);

    expect(res.error).not.toBeNull();
    expect(res.isValid).toBe(false);
  });

  test('Returns no error and valid if email and password not empty', async () => {
    const mockData = {
      email: 'test@runner.com',
      password: 'tester',
    };

    const res = await validateLoginInput(mockData);

    expect(res.error).toBeUndefined();
    expect(res.isValid).toBe(true);
  });
});
