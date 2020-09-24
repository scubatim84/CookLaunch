import React from 'react';
import { shallow } from 'enzyme';
import RecipeImageUpload from '../../../components/Recipes/RecipeImageUpload';

describe('RecipeImageUpload', () => {
  it('Renders component without crashing', () => {
    shallow(<RecipeImageUpload />);
  });
});
