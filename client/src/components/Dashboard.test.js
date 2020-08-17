import React from 'react';
import {shallow} from 'enzyme';
import Dashboard from './Dashboard';

it('Renders component without crashing', () => {
  shallow(<Dashboard />);
});
