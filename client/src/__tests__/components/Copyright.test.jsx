import React from 'react';
import {shallow} from 'enzyme';
import Copyright from '../../components/Copyright';

describe('Copyright', () => {
  it('Renders component without crashing', () => {
    shallow(<Copyright />);
  });
});
