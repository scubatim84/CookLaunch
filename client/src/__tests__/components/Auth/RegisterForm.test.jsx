import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { shallow } from 'enzyme';

import RegisterForm from '../../../components/Auth/RegisterForm';

describe('RegisterForm', () => {
  it('Renders component without crashing', () => {
    shallow(<RegisterForm />);
  });

  it('First name input field stores input in hook', () => {
    render(<RegisterForm />);

    const firstNameInput = screen.getByTestId('firstName');
    expect(firstNameInput.value).toBe('');

    UserEvent.type(firstNameInput, 'Te');
    expect(firstNameInput.value).toBe('Te');
    UserEvent.type(firstNameInput, 'st');
    expect(firstNameInput.value).toBe('Test');
  });

  it('Last name input field stores input in hook', () => {
    render(<RegisterForm />);

    const lastNameInput = screen.getByTestId('lastName');
    expect(lastNameInput.value).toBe('');

    UserEvent.type(lastNameInput, 'Te');
    expect(lastNameInput.value).toBe('Te');
    UserEvent.type(lastNameInput, 'st');
    expect(lastNameInput.value).toBe('Test');
  });

  it('Email input field stores input in hook', () => {
    render(<RegisterForm />);

    const emailInput = screen.getByTestId('email');
    expect(emailInput.value).toBe('');

    UserEvent.type(emailInput, 'Te');
    expect(emailInput.value).toBe('Te');
    UserEvent.type(emailInput, 'st');
    expect(emailInput.value).toBe('Test');
  });

  it('Password input field stores input in hook', () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByTestId('password');
    expect(passwordInput.value).toBe('');

    UserEvent.type(passwordInput, 'Te');
    expect(passwordInput.value).toBe('Te');
    UserEvent.type(passwordInput, 'st');
    expect(passwordInput.value).toBe('Test');
  });

  it('Password 2 input field stores input in hook', () => {
    render(<RegisterForm />);

    const password2Input = screen.getByTestId('password2');
    expect(password2Input.value).toBe('');

    UserEvent.type(password2Input, 'Te');
    expect(password2Input.value).toBe('Te');
    UserEvent.type(password2Input, 'st');
    expect(password2Input.value).toBe('Test');
  });
});
