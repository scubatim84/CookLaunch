import React from 'react';
import {shallow} from 'enzyme';
import IngredientItem from './IngredientItem';

it('Renders component without crashing', () => {
  shallow(<IngredientItem />);
});
