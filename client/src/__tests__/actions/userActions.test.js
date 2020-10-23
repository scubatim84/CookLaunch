import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { getUserData } from '../../actions/userActions';

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
      rest.get('/api/user/profile', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json('test'));
      })
    );

    const response = await getUserData();

    expect(response.status).toBe(200);
    expect(response.data).toEqual('test');
  });

  it('Tests failed API get request to obtain user data', async () => {
    const errorMessage = 'An error message';

    server.use(
      rest.get('/api/user/profile', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(errorMessage));
      })
    );

    const response = await getUserData();

    expect(response).toEqual(errorMessage);
  });
});
