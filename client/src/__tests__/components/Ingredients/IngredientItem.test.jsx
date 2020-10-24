import React from 'react';
import UserEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import IngredientItem from '../../../components/Ingredients/IngredientItem';

describe('IngredientItem', () => {
  it('Renders component without crashing', () => {
    shallow(<IngredientItem />);
  });

  it('Renders ingredient item when unchecked and not a grocery ingredient', () => {
    const testIngredient = {
      id: 'testid',
      name: 'ingredientname',
      quantity: '3',
      quantityType: 'Ounces',
      checked: false,
      groceryExtra: false,
    };

    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked={testIngredient.checked}
        groceryExtra={testIngredient.groceryExtra}
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

    UserEvent.click(queryByTestId('delete-icon'));
    expect(queryByTestId('delete-dialog')).toBeTruthy();
  });
});
