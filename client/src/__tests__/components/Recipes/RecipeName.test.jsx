import React from 'react';
import {shallow} from 'enzyme';
import RecipeName from '../../../components/Recipes/RecipeName';

describe('RecipeName', () => {
  it('Renders component without crashing', () => {
    shallow(<RecipeName />);
  });
});
