import {
  checkResetPasswordToken,
  resetPassword,
  sendPasswordResetEmail,
  validatePassword,
} from '../../actions/authActions';

describe('sendPasswordResetEmail function', () => {
  it('Tests function when email is empty', async () => {
    const response = await sendPasswordResetEmail('');

    expect(response).toBe('Email field is required');
  });

  it('Tests function when email is invalid', async () => {
    const response = await sendPasswordResetEmail('notanemail');

    expect(response).toBe('Email is invalid');
  });
});

describe('checkResetPasswordToken function', () => {
  it('Tests function when token is empty', async () => {
    const response = await checkResetPasswordToken({});

    expect(response.data).toBe('An error has occurred. Please try again.');
  });
});

describe('resetPassword function', () => {
  it('Tests function when userData parameter is empty', async () => {
    const response = await resetPassword({});

    expect(response.data).toBe('Password field is required');
  });

  it('Tests function when password is missing', async () => {
    const userData = { email: 'test@runner.com' };
    const response = await resetPassword(userData);

    expect(response.data).toBe('Password field is required');
  });

  it('Tests function when email is missing', async () => {
    const userData = { password: 'tester' };
    const response = await resetPassword(userData);

    expect(response.data).toBe('Email field is required');
  });

  it('Tests function when email is invalid', async () => {
    const userData = { email: 'notanemail', password: 'tester' };
    const response = await resetPassword(userData);

    expect(response.data).toBe('Email is invalid');
  });
});

describe('validatePassword function', () => {
  it('Tests function when password and confirm password are missing', async () => {
    const response = await validatePassword('', '');

    expect(response.error).toBe('Password field is required');
    expect(response.isValid).toBe(false);
  });

  it('Tests function when confirm password is missing', async () => {
    const response = await validatePassword('tester', '');

    expect(response.error).toBe('Confirm password field is required');
    expect(response.isValid).toBe(false);
  });

  it('Tests function when password is missing', async () => {
    const response = await validatePassword('', 'tester');

    expect(response.error).toBe('Password field is required');
    expect(response.isValid).toBe(false);
  });

  it('Tests function when password is less than 6 characters in length', async () => {
    const response = await validatePassword('teste', 'teste');

    expect(response.error).toBe('Password must be at least 6 characters');
    expect(response.isValid).toBe(false);
  });

  it('Tests function when password and password 2 do not match', async () => {
    const response = await validatePassword('teste', 'tester');

    expect(response.error).toBe('Passwords must match');
    expect(response.isValid).toBe(false);
  });
});
