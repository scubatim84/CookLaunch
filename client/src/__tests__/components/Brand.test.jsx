import React from 'react';
import { render } from '@testing-library/react';

import Brand from '../../components/Brand';

describe('Brand', () => {
  it('Renders correctly', () => {
    render(<Brand />);
  });
});
