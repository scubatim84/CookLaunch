import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { getAllRecipes } from '../../actions/recipeActions';

const server = setupServer();

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('getAllRecipes function', () => {
  it('Tests successful API get request to obtain all recipes owned by user', async () => {
    server.use(
      rest.get('/api/recipes/', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json('test'));
      })
    );

    const response = await getAllRecipes();

    expect(response.status).toBe(200);
    expect(response.data).toEqual('test');
  });

  it('Tests failed API get request to obtain all recipes owned by user', async () => {
    const errorMessage = 'An error message';

    server.use(
      rest.get('/api/recipes/', (req, res, ctx) => {
        // Respond with "500 Internal Server Error" status for this test.
        return res(ctx.status(500), ctx.json(errorMessage));
      })
    );

    const response = await getAllRecipes();

    expect(response.response.data).toEqual(errorMessage);
  });
});
