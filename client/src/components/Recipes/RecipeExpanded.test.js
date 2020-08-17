import React from 'react';
import {shallow} from 'enzyme';
import RecipeExpanded from './RecipeExpanded';

it('Renders component without crashing', () => {
  shallow(<RecipeExpanded />);
});
