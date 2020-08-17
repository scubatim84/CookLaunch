import React from 'react';
import {shallow} from 'enzyme';
import Navbar from './Navbar';

it('Renders component without crashing', () => {
  shallow(<Navbar />);
});
