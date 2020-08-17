import React from 'react';
import {shallow} from 'enzyme';
import IngredientAdd from './IngredientAdd';

it('Renders component without crashing', () => {
  shallow(<IngredientAdd />);
});
