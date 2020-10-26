import React from 'react';
import { shallow } from 'enzyme';

import DeleteButton from '../../components/DeleteButton';

describe('DeleteButton', () => {
  it('Renders component without crashing', () => {
    shallow(<DeleteButton />);
  });
});
