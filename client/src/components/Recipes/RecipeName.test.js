import React from 'react';
import {shallow} from 'enzyme';
import RecipeName from './RecipeName';

it('Renders component without crashing', () => {
  shallow(<RecipeName />);
});
