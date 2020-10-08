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

    const firstNameInput = screen.getAllByRole('textbox')[0];
    expect(firstNameInput.id).toBe('firstName');
    expect(firstNameInput.value).toBe('');

    UserEvent.type(firstNameInput, 'Te');
    expect(firstNameInput.value).toBe('Te');
    UserEvent.type(firstNameInput, 'st');
    expect(firstNameInput.value).toBe('Test');
  });

  it('Last name input field stores input in hook', () => {
    render(<RegisterForm />);

    const lastNameInput = screen.getAllByRole('textbox')[1];
    expect(lastNameInput.id).toBe('lastName');
    expect(lastNameInput.value).toBe('');

    UserEvent.type(lastNameInput, 'Te');
    expect(lastNameInput.value).toBe('Te');
    UserEvent.type(lastNameInput, 'st');
    expect(lastNameInput.value).toBe('Test');
  });

  it('Email input field stores input in hook', () => {
    render(<RegisterForm />);

    const emailInput = screen.getAllByRole('textbox')[2];
    expect(emailInput.id).toBe('email');
    expect(emailInput.value).toBe('');

    UserEvent.type(emailInput, 'Te');
    expect(emailInput.value).toBe('Te');
    UserEvent.type(emailInput, 'st');
    expect(emailInput.value).toBe('Test');
  });
});
