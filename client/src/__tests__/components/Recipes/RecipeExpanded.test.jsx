import React from 'react';
import {shallow} from 'enzyme';
import RecipeExpanded from '../../../components/Recipes/RecipeExpanded';

describe('RecipeExpanded', () => {
  it('Renders component without crashing', () => {
    shallow(<RecipeExpanded />);
  });
});
