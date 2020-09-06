import React from 'react';
import {shallow} from 'enzyme';
import ProfileButtons from './ProfileButtons';

it('Renders component without crashing', () => {
  shallow(<ProfileButtons />);
});

it('Renders component when in edit mode', () => {
  const wrapper = shallow(<ProfileButtons editMode={true} />);

  expect(wrapper.find('#Save')).toHaveLength(1);
  expect(wrapper.find('#Cancel')).toHaveLength(1);
});

it('Renders component when not in edit mode', () => {
  const wrapper = shallow(<ProfileButtons />);

  expect(wrapper.find('#Edit')).toHaveLength(1);
});
