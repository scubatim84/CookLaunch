import React from 'react';
import {shallow} from 'enzyme';
import Brand from './Brand';

it('Renders component without crashing', () => {
  shallow(<Brand />);
});
