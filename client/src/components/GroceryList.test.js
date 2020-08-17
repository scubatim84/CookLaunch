import React from 'react';
import {shallow} from 'enzyme';
import GroceryList from './GroceryList';

it('Renders component without crashing', () => {
  shallow(<GroceryList />);
});
