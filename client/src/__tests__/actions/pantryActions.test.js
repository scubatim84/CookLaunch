import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { addIngredientToPantry } from '../../actions/pantryActions';

const server = setupServer();

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('addIngredientToPantry function', () => {
  const testIngredient = {
    id: 'testid',
    name: 'test',
    quantityType: '',
    quantity: 1,
    createdBy: 'tester',
  };

  it('Tests function when ingredient data is missing', async () => {
    const response = await addIngredientToPantry(testIngredient);

    expect(response.data).toEqual('Please enter a quantity type.');
  });

  it('Tests successful API post request to add ingredient to pantry', async () => {
    testIngredient.quantityType = 'Ounces';

    server.use(
      rest.post('/api/pantry', (req, res, ctx) => {
        return res(ctx.status(201), ctx.json('test'));
      })
    );

    const response = await addIngredientToPantry(testIngredient);

    expect(response.status).toBe(201);
    expect(response.data).toEqual('test');
  });

  it('Tests failed API post request to add ingredient to pantry', async () => {
    testIngredient.quantityType = 'Ounces';
    const errorMessage = 'An error message';

    server.use(
      rest.post('/api/pantry', (req, res, ctx) => {
        // Respond with "500 Internal Server Error" status for this test.
        return res(ctx.status(500), ctx.json(errorMessage));
      })
    );

    const response = await addIngredientToPantry(testIngredient);

    expect(response).toEqual(errorMessage);
  });
});
