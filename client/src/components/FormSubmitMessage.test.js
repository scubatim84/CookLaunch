import React from 'react';
import {shallow} from 'enzyme';
import FormSubmitMessage from './FormSubmitMessage';

const wrapper = shallow(<FormSubmitMessage submitMessage='Test message' />);

it('Renders component without crashing', () => {
  shallow(<FormSubmitMessage />);
});

it('Renders submit message passed as prop to component', () => {
  expect(wrapper.find('#Message').equals('Test message'));
});
