import React from 'react';
import {shallow} from 'enzyme';
import Landing from '../../components/Landing';

describe('Landing', () => {
  it('Renders component without crashing', () => {
    shallow(<Landing />);
  });
});
