import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

it('Renders component without crashing', () => {
  shallow(<App />);
});
