import React from 'react';
import {shallow} from 'enzyme';
import Brand from '../../components/Brand';

describe('Brand', () => {
  it('Renders component without crashing', () => {
    shallow(<Brand />);
  });
});
