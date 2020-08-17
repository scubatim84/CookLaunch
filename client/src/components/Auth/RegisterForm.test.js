import React from 'react';
import {shallow} from 'enzyme';
import RegisterForm from './RegisterForm';

it('Renders component without crashing', () => {
  shallow(<RegisterForm />);
});
