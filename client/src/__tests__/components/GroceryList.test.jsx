import React from 'react';
import {shallow} from 'enzyme';
import GroceryList from '../../components/GroceryList';

describe('GroceryList', () => {
  it('Renders component without crashing', () => {
    shallow(<GroceryList />);
  });
});
