import React from 'react';
import {shallow} from 'enzyme';
import ProfileField from '../../../components/Profile/ProfileField';

describe('ProfileField', () => {
  it('Renders component without crashing', () => {
    shallow(<ProfileField />);
  });
});
