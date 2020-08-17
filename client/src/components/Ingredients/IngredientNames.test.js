import React from 'react';
import {shallow} from 'enzyme';
import IngredientNames from './IngredientNames';

it('Renders component without crashing', () => {
  shallow(<IngredientNames />);
});
