import React from 'react';
import { render } from '@testing-library/react';

import IngredientNameList from '../../../components/Ingredients/IngredientNameList';
import ingredientData from '../../testData';

describe('IngredientNameList renders correctly', () => {
  it('Renders list of ingredient names', () => {
    const ingredientList = {
      data: ingredientData,
    };

    const { queryByTestId, queryByText } = render(
      <IngredientNameList userId="testUser" ingredientList={ingredientList} />,
    );

    expect(queryByTestId('list-item-Ingredient One')).toBeTruthy();
    expect(queryByText('Ingredient One')).toBeTruthy();
    expect(queryByTestId('list-item-Ingredient Two')).toBeTruthy();
    expect(queryByText('Ingredient Two')).toBeTruthy();
    expect(queryByTestId('list-item-Ingredient Three')).toBeTruthy();
    expect(queryByText('Ingredient Three')).toBeTruthy();
  });
});
