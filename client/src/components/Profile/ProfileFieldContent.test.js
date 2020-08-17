import React from 'react';
import {shallow} from 'enzyme';
import ProfileFieldContent from './ProfileFieldContent';

it('Renders component without crashing', () => {
  shallow(<ProfileFieldContent />);
});
