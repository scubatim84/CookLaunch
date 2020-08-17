import React from 'react';
import {shallow} from 'enzyme';
import ForgotPassword from './ForgotPassword';

it('Renders component without crashing', () => {
  shallow(<ForgotPassword />);
});
