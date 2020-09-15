import React from 'react';
import {shallow} from 'enzyme';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
  it('Renders component without crashing', () => {
    shallow(<Navbar />);
  });
});
