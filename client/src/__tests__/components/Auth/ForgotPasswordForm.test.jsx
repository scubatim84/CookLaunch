import React from 'react';
import { render } from '@testing-library/react';

import ForgotPasswordForm from '../../../components/Auth/ForgotPasswordForm';

describe('ForgotPasswordForm', () => {
  it('Renders component without crashing', () => {
    render(<ForgotPasswordForm />);
  });
});
