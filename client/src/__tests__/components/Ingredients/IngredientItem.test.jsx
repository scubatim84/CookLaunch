import React from 'react';
import UserEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';
import { shallow } from 'enzyme';
import IngredientItem from '../../../components/Ingredients/IngredientItem';

describe('IngredientItem', () => {
  const testIngredient = {
    id: 'testid',
    name: 'ingredientname',
    quantity: '3',
    quantityType: 'Ounces',
    checked: false,
    groceryExtra: false,
  };

  const handleDelete = jest.fn((id) => id);

  it('Renders component without crashing', () => {
    shallow(<IngredientItem />);
  });

  it('Renders ingredient item when unchecked and not a grocery ingredient', () => {
    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked={testIngredient.checked}
        groceryExtra={testIngredient.groceryExtra}
        handleDelete={handleDelete}
      />
    );

    expect(queryByTestId('unchecked-ingredientname').innerHTML).toBe(
      testIngredient.name
    );
    expect(queryByTestId('unchecked-3').innerHTML).toBe(
      testIngredient.quantity
    );
    expect(queryByTestId('unchecked-Ounces').innerHTML).toBe(
      testIngredient.quantityType
    );

    expect(queryByTestId('edit-icon')).toBeTruthy();
    expect(queryByTestId('delete-icon')).toBeTruthy();
    expect(queryByTestId('delete-dialog')).toBeNull();
  });

  it('IngredientDeleteDialog component functions correctly', async () => {
    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked={testIngredient.checked}
        groceryExtra={testIngredient.groceryExtra}
        handleDelete={handleDelete}
      />
    );

    UserEvent.click(queryByTestId('delete-icon'));
    expect(queryByTestId('delete-dialog')).toBeTruthy();

    UserEvent.click(queryByTestId('delete-dialog-cancel'));
    await waitFor(() => expect(queryByTestId('delete-dialog')).toBeNull());

    UserEvent.click(queryByTestId('delete-icon'));
    UserEvent.click(queryByTestId('delete-dialog-delete'));
    await waitFor(() => expect(handleDelete).toHaveBeenCalledTimes(1));
  });
});
