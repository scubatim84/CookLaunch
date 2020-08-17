import React from 'react';
import {shallow} from 'enzyme';
import Copyright from './Copyright';

it('Renders component without crashing', () => {
  shallow(<Copyright />);
});
