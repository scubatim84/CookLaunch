import React from 'react';
import {shallow} from 'enzyme';
import RecipeIngredientView from './RecipeIngredientView';

it('Renders component without crashing', () => {
  shallow(<RecipeIngredientView />);
});
