import React from 'react';
import {shallow} from 'enzyme';
import Loader from './Loader';

it('Renders component without crashing', () => {
  shallow(<Loader />);
});
