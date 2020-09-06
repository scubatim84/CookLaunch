import React from 'react';
import {shallow} from 'enzyme';
import CardTitle from './CardTitle';

const wrapper = shallow(<CardTitle title='Test Title' />);

it('Renders component without crashing', () => {
  shallow(<CardTitle title='Test Title' />);
});

it('Renders title passed as prop to component', () => {
  expect(wrapper.find('#Title').equals('Test Title'));
});
