import React from 'react';
import { render } from '@testing-library/react';

import ProfileField from '../../../components/Profile/ProfileField';

describe('ProfileField', () => {
  it('Renders component without crashing', () => {
    render(<ProfileField />);
  });
});
