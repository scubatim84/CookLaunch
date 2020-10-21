import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { addRecipe, getAllRecipes } from '../../actions/recipeActions';

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

describe('addRecipe function', () => {
  const testRecipe = {
    name: '',
    ingredients: ['ingredientOne', 'ingredientTwo'],
    imageUrl: '',
    imageKey: '',
  };

  it('Tests function when name is empty', async () => {
    const response = await addRecipe(testRecipe);

    expect(response).toEqual('Please enter a recipe name.');
  });

  it('Tests function when ingredients are empty', async () => {
    testRecipe.name = 'test';
    testRecipe.ingredients = [];

    const response = await addRecipe(testRecipe);

    expect(response).toEqual('Please add one or more ingredients.');
  });

  it('Tests successful API post request for adding recipe', async () => {
    testRecipe.name = 'test';
    testRecipe.ingredients = ['ingredientOne', 'ingredientTwo'];

    server.use(
      rest.post(`/api/recipes/`, (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(testRecipe));
      })
    );

    const response = await addRecipe(testRecipe);

    expect(response.status).toBe(201);
    expect(response.data).toEqual(testRecipe);
  });

  it('Tests failed API post request for adding recipe', async () => {
    testRecipe.name = 'test';
    testRecipe.ingredients = ['ingredientOne', 'ingredientTwo'];
    const errorMessage = 'An error message';

    server.use(
      rest.post(`/api/recipes/`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(errorMessage));
      })
    );

    const response = await addRecipe(testRecipe);

    expect(response).toEqual(errorMessage);
  });
});
