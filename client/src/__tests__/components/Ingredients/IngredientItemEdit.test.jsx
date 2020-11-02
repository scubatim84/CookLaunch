import React from 'react';
import { render } from '@testing-library/react';

import IngredientItemEdit from '../../../components/Ingredients/IngredientItemEdit';

const testIngredient = {
  id: 'testid',
  name: 'ingredientname',
  quantity: '3',
  quantityType: 'Ounces',
  checked: false,
  groceryExtra: false,
};

const error = {
  message: '',
};

const name = 'testname';

describe('IngredientItemEdit renders correctly', () => {
  it('Renders component without crashing', () => {
    render(
      <IngredientItemEdit
        editIngredient={testIngredient}
        error={error}
        name={name}
      />
    );
  });
});
