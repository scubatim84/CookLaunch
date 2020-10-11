import { rest } from 'msw';
import { setupServer } from 'msw/node';

import {
  registerUser,
  checkResetPasswordToken,
  resetPassword,
  sendPasswordResetEmail,
  validatePassword,
} from '../../actions/authActions';

const newUser = {
  firstName: 'test',
  lastName: 'runner',
  email: 'test@runner.com',
};

const server = setupServer(
  rest.post('/api/auth/register', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(newUser));
  }),
  rest.get('/api/auth/validateresetpasswordtoken', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json('test@runner.com'));
  })
);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('registerUser function', () => {
  it('Tests successful API post request', async () => {
    const response = await registerUser(newUser);

    expect(response.status).toBe(201);
    expect(response.data).toEqual(newUser);
  });

  it('Tests failed API post request', async () => {
    const errorMessage = 'An error message';

    server.use(
      rest.post('/api/auth/register', (req, res, ctx) => {
        // Respond with "400 Bad Request" status for this test.
        return res(ctx.status(400), ctx.json(errorMessage));
      })
    );

    const response = await registerUser(newUser);

    expect(response).toEqual(errorMessage);
  });
});

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

  it('Tests function when API get request is successful', async () => {
    const response = await checkResetPasswordToken('testtoken');

    expect(response.status).toBe(200);
    expect(response.data).toBe('test@runner.com');
  });

  it('Tests function when API get request fails', async () => {
    server.use(
      rest.get('/api/auth/validateresetpasswordtoken', (req, res, ctx) => {
        return res(ctx.status(403), ctx.json('User not found.'));
      })
    );
    const response = await checkResetPasswordToken('testtoken');

    expect(response).toBe('User not found.');
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
