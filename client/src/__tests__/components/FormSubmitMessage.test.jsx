import React from 'react';
import {shallow} from 'enzyme';
import FormSubmitMessage from '../../components/FormSubmitMessage';

describe('FormSubmitMessage', () => {
  it('Renders component without crashing', () => {
    shallow(<FormSubmitMessage />);
  });

  it('Renders submit message passed as prop to component', () => {
    const wrapper = shallow(<FormSubmitMessage submitMessage='Test message' />);

    expect(wrapper.find('#Message').equals('Test message'));
  });
});
