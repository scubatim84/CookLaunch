import React from 'react';
import {shallow} from 'enzyme';
import ForgotPasswordForm from './ForgotPasswordForm';

it('Renders component without crashing', () => {
  shallow(<ForgotPasswordForm />);
});
