import React from 'react';
import {shallow} from 'enzyme';
import RegisterForm from '../../../components/Auth/RegisterForm';

describe('RegisterForm', () => {
  it('Renders component without crashing', () => {
    shallow(<RegisterForm />);
  });
});
