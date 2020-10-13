import { rest } from 'msw';
import { setupServer } from 'msw/node';

import {
  getIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
} from '../../actions/ingredientActions';

const server = setupServer();

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('getIngredients function', () => {
  it('Tests successful API get request for getting ingredients', async () => {
    server.use(
      rest.get('/api/ingredients/', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json('test'));
      })
    );

    const response = await getIngredients();

    expect(response.status).toBe(200);
    expect(response.data).toEqual('test');
  });

  it('Tests failed API get request for getting ingredients', async () => {
    const errorMessage = 'An error message';

    server.use(
      rest.get('/api/ingredients/', (req, res, ctx) => {
        // Respond with "400 Bad Request" status for this test.
        return res(ctx.status(400), ctx.json(errorMessage));
      })
    );

    const response = await getIngredients();

    expect(response).toEqual(errorMessage);
  });
});

describe('addIngredients function', () => {
  it('Tests function when name is empty', async () => {
    const testIngredient = {
      name: '',
      createdBy: 'tester',
    };

    const response = await addIngredient(testIngredient);

    expect(response.data).toEqual('Please enter an ingredient name.');
  });

  it('Tests function when name is empty', async () => {
    const testIngredient = {
      name: 'test',
      createdBy: '',
    };

    const response = await addIngredient(testIngredient);

    expect(response.data).toEqual('An error has occurred. Please try again.');
  });

  it('Tests successful API post request for adding ingredient', async () => {
    const testIngredient = {
      name: 'test',
      createdBy: 'tester',
    };

    server.use(
      rest.post('/api/ingredients/', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json('test'));
      })
    );

    const response = await addIngredient(testIngredient);

    expect(response.status).toBe(200);
    expect(response.data).toEqual('test');
  });

  it('Tests failed API post request for adding ingredient', async () => {
    const testIngredient = {
      name: 'test',
      createdBy: 'tester',
    };
    const errorMessage = 'An error message';

    server.use(
      rest.post('/api/ingredients/', (req, res, ctx) => {
        // Respond with "400 Bad Request" status for this test.
        return res(ctx.status(400), ctx.json(errorMessage));
      })
    );

    const response = await addIngredient(testIngredient);

    expect(response).toEqual(errorMessage);
  });
});
