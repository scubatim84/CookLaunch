import React from 'react';
import {shallow} from 'enzyme';
import App from '../../App';

describe('App', () => {
  it('Renders component without crashing', () => {
    shallow(<App />);
  });
});
