import React from 'react';
import {shallow} from 'enzyme';
import ForgotPassword from '../../../components/Auth/ForgotPassword';

describe('ForgotPassword', () => {
  it('Renders component without crashing', () => {
    shallow(<ForgotPassword />);
  });
});
