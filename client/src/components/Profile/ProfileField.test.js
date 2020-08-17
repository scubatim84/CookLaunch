import React from 'react';
import {shallow} from 'enzyme';
import ProfileField from './ProfileField';

it('Renders component without crashing', () => {
  shallow(<ProfileField />);
});
