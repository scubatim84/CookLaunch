import React from 'react';
import {shallow} from 'enzyme';
import IngredientNames from '../../../components/Ingredients/IngredientNames';

describe('IngredientNames', () => {
  it('Renders component without crashing', () => {
    shallow(<IngredientNames />);
  });
});
