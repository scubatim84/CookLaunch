import React from 'react';
import { render } from '@testing-library/react';

import Loader from '../../components/Loader';

describe('Loader', () => {
  it('Renders component without crashing', () => {
    render(<Loader />);
  });
});
