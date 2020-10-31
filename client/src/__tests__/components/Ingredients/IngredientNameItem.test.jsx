import React from 'react';
import UserEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';

import IngredientNameItem from '../../../components/Ingredients/IngredientNameItem';

describe('IngredientNameItem', () => {
  const ingredient = {
    createdBy: 'testUser',
    userId: 'userTestId',
    id: 'testId',
    name: 'test ingredient',
    dateLastChanged: new Date(),
  };

  const getIngredientData = jest.fn();
  const handleDelete = jest.fn();

  it('Renders component without crashing', () => {
    render(<IngredientNameItem />);
  });

  it('Renders only ingredient name text when userId does not equal createdBy', async () => {
    const { queryByText } = render(
      <IngredientNameItem
        key={ingredient.name + ingredient.dateLastChanged}
        createdBy={ingredient.createdBy}
        userId={ingredient.userId}
        id={ingredient.id}
        name={ingredient.name}
        getIngredientData={getIngredientData}
        handleDelete={handleDelete}
      />
    );

    expect(queryByText(ingredient.name)).toBeTruthy();
  });

  it('Renders component with buttons when userId equals createdBy', async () => {
    ingredient.createdBy = ingredient.userId;

    const { queryByTestId, queryByText } = render(
      <IngredientNameItem
        key={ingredient.name + ingredient.dateLastChanged}
        createdBy={ingredient.createdBy}
        userId={ingredient.userId}
        id={ingredient.id}
        name={ingredient.name}
        getIngredientData={getIngredientData}
        handleDelete={handleDelete}
      />
    );

    expect(queryByText(ingredient.name)).toBeTruthy();
    expect(queryByTestId('edit-icon')).toBeTruthy();
    expect(queryByTestId('delete-icon')).toBeTruthy();
  });

  it('Renders edit mode of component', async () => {
    ingredient.createdBy = ingredient.userId;

    const { queryByTestId } = render(
      <IngredientNameItem
        key={ingredient.name + ingredient.dateLastChanged}
        createdBy={ingredient.createdBy}
        userId={ingredient.userId}
        id={ingredient.id}
        name={ingredient.name}
        getIngredientData={getIngredientData}
        handleDelete={handleDelete}
      />
    );

    UserEvent.click(queryByTestId('edit-icon'));
    await waitFor(() => expect(queryByTestId('edit-icon')).toBeNull());

    expect(queryByTestId('done-icon')).toBeTruthy();
    expect(queryByTestId('cancel-icon')).toBeTruthy();
    expect(queryByTestId('ingredient-name-edit')).toBeTruthy();

    expect(queryByTestId('edit-icon')).toBeNull();
    expect(queryByTestId('delete-icon')).toBeNull();
  });
});
