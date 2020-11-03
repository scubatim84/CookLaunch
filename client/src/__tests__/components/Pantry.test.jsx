import React from 'react';
import { shallow } from 'enzyme';
import Pantry from '../../components/Pantry';

describe('Pantry', () => {
  it('Renders component without crashing', () => {
    shallow(<Pantry />);
  });
});
