import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import LoginForm from '../../../components/Auth/LoginForm';

describe('LoginForm', () => {
  it('Email input field stores input in hook', () => {
    render(<LoginForm />);

    const emailInput = screen.getByTestId('email');
    expect(emailInput.value).toBe('');

    UserEvent.type(emailInput, 'Te');
    expect(emailInput.value).toBe('Te');
    UserEvent.type(emailInput, 'st');
    expect(emailInput.value).toBe('Test');
  });

  it('Password input field stores input in hook', () => {
    render(<LoginForm />);

    const passwordInput = screen.getByTestId('password');
    expect(passwordInput.value).toBe('');

    UserEvent.type(passwordInput, 'Te');
    expect(passwordInput.value).toBe('Te');
    UserEvent.type(passwordInput, 'st');
    expect(passwordInput.value).toBe('Test');
  });
});
