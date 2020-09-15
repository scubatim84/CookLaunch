import React from 'react';
import {shallow} from 'enzyme';
import ForgotPasswordForm from '../../../components/Auth/ForgotPasswordForm';

describe('ForgotPasswordForm', () => {
  it('Renders component without crashing', () => {
    shallow(<ForgotPasswordForm />);
  });
});
