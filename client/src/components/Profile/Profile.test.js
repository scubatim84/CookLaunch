import React from 'react';
import {shallow} from 'enzyme';
import Profile from './Profile';

it('Renders component without crashing', () => {
  shallow(<Profile />);
});
