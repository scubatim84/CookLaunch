import React from 'react';
import {shallow} from 'enzyme';
import ProfileFieldContent from './ProfileFieldContent';
import {TextField, Typography} from '@material-ui/core';

it('Renders component without crashing', () => {
  shallow(<ProfileFieldContent />);
});

it('Renders component when in edit mode', () => {
  const wrapper = shallow(<ProfileFieldContent editMode={true} />);

  expect(wrapper.find(TextField)).toHaveLength(1);
});

it('Renders component when not in edit mode', () => {
  const wrapper = shallow(<ProfileFieldContent content='Test content' />);

  expect(wrapper.find(Typography)).toHaveLength(1);
  expect(wrapper.find(Typography).equals('Test content'));
});
