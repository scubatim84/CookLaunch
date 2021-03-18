import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import IngredientNames from '../../../components/Ingredients/IngredientNames';
import ingredientData from '../../testData';

const server = setupServer();

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('IngredientNames renders correctly', () => {
  it('Redirects user to login component if not logged in', () => {
    render(
      <Router>
        <IngredientNames />
      </Router>,
    );
  });

  it('Renders loader if props have an id but no ingredient list', async () => {
    const { queryByTestId } = render(
      <IngredientNames isLoggedIn id="testId" />,
    );

    expect(queryByTestId('loader')).toBeTruthy();
  });

  it('Renders loader if props have an ingredient list but no id', async () => {
    const { queryByTestId } = render(
      <IngredientNames isLoggedIn ingredients={ingredientData} />,
    );

    expect(queryByTestId('loader')).toBeTruthy();
  });

  it('Renders list of ingredient names', () => {
    const { queryByTestId, queryByText } = render(
      <IngredientNames isLoggedIn id="testId" ingredients={ingredientData} />,
    );

    expect(queryByText('Ingredients For Recipes')).toBeTruthy();
    expect(queryByTestId('ingredient-name-entry')).toBeTruthy();
    expect(queryByTestId('add-ingredient-button')).toBeTruthy();
    expect(queryByTestId('list-item-Ingredient One')).toBeTruthy();
    expect(queryByText('Ingredient One')).toBeTruthy();
    expect(queryByTestId('list-item-Ingredient Two')).toBeTruthy();
    expect(queryByText('Ingredient Two')).toBeTruthy();
    expect(queryByTestId('list-item-Ingredient Three')).toBeTruthy();
    expect(queryByText('Ingredient Three')).toBeTruthy();
  });
});

describe('IngredientNames buttons function correctly', () => {
  it('User can type in ingredient to add to list', async () => {
    render(
      <IngredientNames isLoggedIn id="testId" ingredients={ingredientData} />,
    );

    const ingredientInput = screen.getByTestId('ingredient-name-entry');
    UserEvent.type(ingredientInput, 'test ingredient');
    expect(ingredientInput.value).toBe('test ingredient');
  });

  it('User can delete ingredient from list', async () => {
    const getIngredientData = jest.fn();

    server.use(
      rest.delete('/api/ingredients/testIngredientId1', (req, res, ctx) => res(ctx.status(204), ctx.json(null))),
    );

    const { queryByTestId, queryAllByTestId } = render(
      <IngredientNames
        isLoggedIn
        id="testUser"
        ingredients={ingredientData}
        getIngredientData={getIngredientData}
      />,
    );

    UserEvent.click(queryAllByTestId('delete-icon')[0]);
    UserEvent.click(queryByTestId('confirm-dialog-button-left'));
    await waitFor(() => expect(getIngredientData).toHaveBeenCalledTimes(1));
  });
});
