import React from 'react';
import {shallow} from 'enzyme';
import ProfileButtons from './ProfileButtons';

it('Renders component without crashing', () => {
  shallow(<ProfileButtons />);
});
