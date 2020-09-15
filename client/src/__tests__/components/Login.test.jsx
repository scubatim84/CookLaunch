import React from 'react';
import {shallow} from 'enzyme';
import Login from '../../components/Login';

describe('Login', () => {
  it('Renders component without crashing', () => {
    shallow(<Login />);
  });
});
