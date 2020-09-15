import React from 'react';
import {shallow} from 'enzyme';
import RecipeIngredientView from '../../../components/Recipes/RecipeIngredientView';

describe('RecipeIngredientView', () => {
  it('Renders component without crashing', () => {
    shallow(<RecipeIngredientView />);
  });
});
