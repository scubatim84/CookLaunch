import React from 'react';
import { render } from '@testing-library/react';

import Landing from '../../components/Landing';

describe('Landing', () => {
  it('Renders component without crashing', () => {
    render(<Landing />);
  });
});
