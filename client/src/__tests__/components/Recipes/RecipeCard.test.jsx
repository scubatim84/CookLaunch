import React from 'react';
import {shallow} from 'enzyme';
import RecipeCard from '../../../components/Recipes/RecipeCard';

describe('RecipeCard', () => {
  it('Renders component without crashing', () => {
    shallow(<RecipeCard />);
  });
});
