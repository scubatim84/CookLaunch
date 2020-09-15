import React from 'react';
import {shallow} from 'enzyme';
import RecipeButton from '../../../components/Recipes/RecipeButton';

describe('RecipeButton', () => {
  it('Renders component without crashing', () => {
    shallow(<RecipeButton />);
  });
});
