import React from 'react';
import {shallow} from 'enzyme';
import FormSubmitMessage from './FormSubmitMessage';
import Typography from '@material-ui/core/Typography';

const wrapper = shallow(<FormSubmitMessage submitMessage='Test message' />);

it('Renders component without crashing', () => {
  shallow(<FormSubmitMessage />);
});

it('Renders submit message passed as prop to component', () => {
  expect(wrapper.equals(<Typography>Test message</Typography>));
});
