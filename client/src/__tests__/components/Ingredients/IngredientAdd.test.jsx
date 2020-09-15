import React from 'react';
import {shallow} from 'enzyme';
import IngredientAdd from '../../../components/Ingredients/IngredientAdd';

describe('IngredientAdd', () => {
  it('Renders component without crashing', () => {
    shallow(<IngredientAdd />);
  });
});
