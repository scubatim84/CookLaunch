import React from 'react';
import { render } from '@testing-library/react';

import Login from '../../components/Login';

describe('Login', () => {
  it('Renders component without crashing', () => {
    render(<Login />);
  });
});
