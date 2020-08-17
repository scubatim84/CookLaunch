import React from 'react';
import {shallow} from 'enzyme';
import Landing from './Landing';

it('Renders component without crashing', () => {
  shallow(<Landing />);
});
