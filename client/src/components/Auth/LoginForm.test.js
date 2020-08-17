import React from 'react';
import {shallow} from 'enzyme';
import LoginForm from './LoginForm';

it('Renders component without crashing', () => {
  shallow(<LoginForm />);
});
