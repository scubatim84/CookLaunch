import React from 'react';
import {shallow} from 'enzyme';
import RecipeAdd from './RecipeAdd';

it('Renders component without crashing', () => {
  shallow(<RecipeAdd />);
});
