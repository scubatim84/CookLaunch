import React from 'react';
import {shallow} from 'enzyme';
import ResetPasswordByEmailForm from './ResetPasswordByEmailForm';

it('Renders component without crashing', () => {
  shallow(<ResetPasswordByEmailForm />);
});
