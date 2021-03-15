import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { getUserData, updateUserProfile } from '../../actions/userActions';

const server = setupServer();

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('getUserData function', () => {
  it('Tests successful API get request to obtain user data', async () => {
    server.use(
      rest.get('/api/user/profile', (req, res, ctx) => res(ctx.status(200), ctx.json('test'))),
    );

    const response = await getUserData();

    expect(response.status).toBe(200);
    expect(response.data).toEqual('test');
  });

  it('Tests failed API get request to obtain user data', async () => {
    const errorMessage = 'An error message';

    server.use(
      rest.get('/api/user/profile', (req, res, ctx) => res(ctx.status(500), ctx.json(errorMessage))),
    );

    const response = await getUserData();

    expect(response.data).toEqual(errorMessage);
  });
});

describe('updateUserProfile function', () => {
  const userData = {
    firstName: '',
    lastName: 'runner',
    email: 'test@runner.com',
  };

  it('Empty first name returns error', async () => {
    const response = await updateUserProfile(userData);

    expect(response.data).toBe('Please enter a first name.');
  });

  it('Empty last name returns error', async () => {
    userData.firstName = 'test';
    userData.lastName = '';

    const response = await updateUserProfile(userData);

    expect(response.data).toBe('Please enter a last name.');
  });

  it('Empty email returns error', async () => {
    userData.lastName = 'runner';
    userData.email = '';

    const response = await updateUserProfile(userData);

    expect(response.data).toBe('Please enter an email.');
  });

  it('Tests successful API put request to update user profile', async () => {
    userData.email = 'test@runner.com';

    server.use(
      rest.put('/api/user/profile', (req, res, ctx) => res(ctx.status(200), ctx.json(userData))),
    );

    const response = await updateUserProfile(userData);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(userData);
  });

  it('Tests failed API put request to update user profile', async () => {
    const errorMessage = 'An error message';

    server.use(
      rest.put('/api/user/profile', (req, res, ctx) => res(ctx.status(500), ctx.json(errorMessage))),
    );

    const response = await updateUserProfile(userData);

    expect(response.data).toBe(errorMessage);
  });
});
