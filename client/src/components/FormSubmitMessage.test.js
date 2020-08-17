import React from 'react';
import {shallow} from 'enzyme';
import FormSubmitMessage from './FormSubmitMessage';

it('Renders component without crashing', () => {
  shallow(<FormSubmitMessage />);
});
