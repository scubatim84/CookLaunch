import React from 'react';
import {shallow} from 'enzyme';
import IngredientNameItem from './IngredientNameItem';

it('Renders component without crashing', () => {
  shallow(<IngredientNameItem />);
});
