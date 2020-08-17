import React from 'react';
import {shallow} from 'enzyme';
import CardTitle from './CardTitle';

it('Renders component without crashing', () => {
  shallow(<CardTitle />);
});
