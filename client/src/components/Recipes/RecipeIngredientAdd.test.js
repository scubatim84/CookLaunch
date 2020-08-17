import React from 'react';
import {shallow} from 'enzyme';
import RecipeIngredientAdd from './RecipeIngredientAdd';

it('Renders component without crashing', () => {
  shallow(<RecipeIngredientAdd />);
});
