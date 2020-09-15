import React from 'react';
import {shallow} from 'enzyme';
import Loader from '../../components/Loader';

describe('Loader', () => {
  it('Renders component without crashing', () => {
    shallow(<Loader />);
  });
});
