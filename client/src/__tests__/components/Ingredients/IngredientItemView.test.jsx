import React from 'react';
import { shallow } from 'enzyme';

import IngredientItemView from '../../../components/Ingredients/IngredientItemView';

const testIngredient = {
  id: 'testid',
  name: 'ingredientname',
  quantity: '3',
  quantityType: 'Ounces',
  checked: false,
  groceryExtra: false,
};

const ingredientDialog = {
  title: 'Delete ingredient?',
  text:
    'This action cannot be reversed. Are you sure you want to delete this ingredient?',
  leftButtonLabel: 'Delete',
  rightButtonLabel: 'Cancel',
};

describe('IngredientItemView renders correctly', () => {
  it('Renders component without crashing', () => {
    shallow(
      <IngredientItemView
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        ingredientDialog={ingredientDialog}
      />
    );
  });
});
