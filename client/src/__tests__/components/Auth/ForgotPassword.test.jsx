import React from 'react';
import { render } from '@testing-library/react';

import ForgotPassword from '../../../components/Auth/ForgotPassword';

describe('ForgotPassword', () => {
  it('Renders component without crashing', () => {
    render(<ForgotPassword />);
  });
});
