import React from 'react';
import {shallow} from 'enzyme';
import IngredientItem from '../../../components/Ingredients/IngredientItem';

describe('IngredientItem', () => {
  it('Renders component without crashing', () => {
    shallow(<IngredientItem />);
  });
});
