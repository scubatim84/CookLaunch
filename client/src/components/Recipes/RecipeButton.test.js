import React from 'react';
import {shallow} from 'enzyme';
import RecipeButton from './RecipeButton';

it('Renders component without crashing', () => {
  shallow(<RecipeButton />);
});
