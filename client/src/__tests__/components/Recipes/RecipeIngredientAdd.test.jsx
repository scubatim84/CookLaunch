import React from 'react';
import {shallow} from 'enzyme';
import RecipeIngredientAdd from '../../../components/Recipes/RecipeIngredientAdd';

describe('RecipeIngredientAdd', () => {
  it('Renders component without crashing', () => {
    shallow(<RecipeIngredientAdd />);
  });
});
