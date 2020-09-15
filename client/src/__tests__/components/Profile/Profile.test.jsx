import React from 'react';
import {shallow} from 'enzyme';
import Profile from '../../../components/Profile/Profile';

describe('Profile', () => {
  it('Renders component without crashing', () => {
    shallow(<Profile />);
  });
});
