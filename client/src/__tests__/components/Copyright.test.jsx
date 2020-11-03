import React from 'react';
import { render } from '@testing-library/react';

import Copyright from '../../components/Copyright';

describe('Copyright', () => {
  it('Renders component without crashing', () => {
    render(<Copyright />);
  });
});
