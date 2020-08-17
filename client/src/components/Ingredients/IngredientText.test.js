import React from 'react';
import {shallow} from 'enzyme';
import IngredientText from './IngredientText';

it('Renders component without crashing', () => {
  shallow(<IngredientText />);
});
