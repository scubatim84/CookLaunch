import React from 'react';
import {shallow} from 'enzyme';
import IngredientNameItem from '../../../components/Ingredients/IngredientNameItem';

describe('IngredientNameItem', () => {
  it('Renders component without crashing', () => {
    shallow(<IngredientNameItem />);
  });
});
