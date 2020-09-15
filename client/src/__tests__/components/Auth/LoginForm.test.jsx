import React from 'react';
import {shallow} from 'enzyme';
import LoginForm from '../../../components/Auth/LoginForm';

describe('LoginForm', () => {
  it('Renders component without crashing', () => {
    shallow(<LoginForm />);
  });
});
