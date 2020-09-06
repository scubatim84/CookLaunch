import React from 'react';
import {shallow} from 'enzyme';
import ProfileFieldLabel from './ProfileFieldLabel';
import {Typography} from '@material-ui/core';

it('Renders component without crashing', () => {
  shallow(<ProfileFieldLabel />);
});

it('Renders title passed as prop to component', () => {
  const wrapper = shallow(<ProfileFieldLabel label='Test label' />);

  expect(wrapper.find(Typography).equals('Test label'));
});
