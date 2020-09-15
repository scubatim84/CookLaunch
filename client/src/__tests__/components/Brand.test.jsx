import React from 'react';
import {shallow} from 'enzyme';
import Brand from '../../components/Brand';

describe('Brand', () => {
  it('Renders correctly', () => {
    shallow(<Brand />);
  });
});
