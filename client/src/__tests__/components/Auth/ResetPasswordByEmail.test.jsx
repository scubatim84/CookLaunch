import React from 'react';
import {shallow} from 'enzyme';
import ResetPasswordByEmail from '../../../components/Auth/ResetPasswordByEmail';

describe('ResetPasswordByEmail', () => {
  it('Renders component without crashing', () => {
    shallow(<ResetPasswordByEmail />);
  });
});
