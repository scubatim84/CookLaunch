import React from 'react';
import {shallow} from 'enzyme';
import RecipeCard from './RecipeCard';

it('Renders component without crashing', () => {
  shallow(<RecipeCard />);
});
