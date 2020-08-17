import React from 'react';
import {shallow} from 'enzyme';
import Welcome from './Welcome';

it('Renders component without crashing', () => {
  shallow(<Welcome />);
});
