import React from 'react';
import {shallow} from 'enzyme';
import RecipeAdd from '../../../components/Recipes/RecipeAdd';

describe('RecipeAdd', () => {
  it('Renders component without crashing', () => {
    shallow(<RecipeAdd />);
  });
});
