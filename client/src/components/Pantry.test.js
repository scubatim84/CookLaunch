import React from 'react';
import {shallow} from 'enzyme';
import Pantry from './Pantry';

it('Renders component without crashing', () => {
  shallow(<Pantry />);
});
