import React from 'react';
import {shallow} from 'enzyme';
import ProfileFieldLabel from './ProfileFieldLabel';

it('Renders component without crashing', () => {
  shallow(<ProfileFieldLabel />);
});
