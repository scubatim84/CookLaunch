import React from 'react';
import {shallow} from 'enzyme';
import ProfileFieldLabel from '../../../components/Profile/ProfileFieldLabel';
import {Typography} from '@material-ui/core';

describe('ProfileFieldLabel', () => {
  it('Renders component without crashing', () => {
    shallow(<ProfileFieldLabel />);
  });

  it('Renders title passed as prop to component', () => {
    const wrapper = shallow(<ProfileFieldLabel label='Test label' />);

    expect(wrapper.find(Typography).equals('Test label'));
  });
});
