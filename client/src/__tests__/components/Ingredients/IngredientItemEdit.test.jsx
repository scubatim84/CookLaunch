import React from 'react';
import { shallow } from 'enzyme';

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
  errorMessage: '',
};

const name = 'testname';

describe('IngredientItemEdit renders correctly', () => {
  it('Renders component without crashing', () => {
    shallow(
      <IngredientItemEdit
        editIngredient={testIngredient}
        error={error}
        name={name}
      />
    );
  });
});
