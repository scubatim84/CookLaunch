import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, waitFor, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Profile from '../../../components/Profile/Profile';
import { REQUEST_SUCCESS, REQUEST_FAIL } from '../../../actions/types';

const server = setupServer();

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('Profile', () => {
  it('Renders component without crashing', () => {
    shallow(<Profile />);
  });

  it('Redirects user to login component if not logged in', () => {
    render(
      <Router>
        <Profile />
      </Router>
    );
  });

  it('Renders loader if user logged in and props do not contain email', () => {
    const { queryByTestId } = render(<Profile isLoggedIn />);

    expect(queryByTestId('loader')).toBeTruthy();
  });

  it('Renders profile screen if user logged in and props contain email', () => {
    const { queryByTestId } = render(
      <Profile isLoggedIn email='test@runner.com' />
    );

    expect(queryByTestId('loader')).toBeNull();
    expect(queryByTestId('top-profile-div')).toBeTruthy();
  });

  it('Renders profile screen with edit mode toggled by edit profile and save/cancel', () => {
    const { queryByTestId } = render(
      <Profile isLoggedIn email='test@runner.com' />
    );

    expect(queryByTestId('edit-button')).toBeTruthy();
    expect(queryByTestId('save-button')).toBeNull();
    expect(queryByTestId('cancel-button')).toBeNull();

    UserEvent.click(queryByTestId('edit-button'));

    expect(queryByTestId('edit-button')).toBeNull();
    expect(queryByTestId('save-button')).toBeTruthy();
    expect(queryByTestId('cancel-button')).toBeTruthy();
  });

  it('Clicking cancel while in edit mode turns edit mode off', () => {
    const { queryByTestId } = render(
      <Profile isLoggedIn email='test@runner.com' />
    );

    UserEvent.click(queryByTestId('edit-button'));

    expect(queryByTestId('edit-button')).toBeNull();
    expect(queryByTestId('save-button')).toBeTruthy();
    expect(queryByTestId('cancel-button')).toBeTruthy();

    UserEvent.click(queryByTestId('cancel-button'));

    expect(queryByTestId('edit-button')).toBeTruthy();
    expect(queryByTestId('save-button')).toBeNull();
    expect(queryByTestId('cancel-button')).toBeNull();
  });

  it('Profile fields cannot be edited when not in edit mode', () => {
    const firstName = 'Test';
    const lastName = 'Runner';
    const email = 'test@runner.com';

    const { queryByTestId } = render(
      <Profile
        isLoggedIn
        firstName={firstName}
        lastName={lastName}
        email={email}
      />
    );

    expect(queryByTestId('view-Email').innerHTML).toBe(email);
    expect(queryByTestId('view-First Name').innerHTML).toBe(firstName);
    expect(queryByTestId('view-Last Name').innerHTML).toBe(lastName);
  });

  it('Profile fields can be edited when in edit mode', () => {
    const firstName = 'Test';
    const lastName = 'Runner';
    const email = 'test@';

    const { queryByTestId } = render(
      <Profile
        isLoggedIn
        firstName={firstName}
        lastName={lastName}
        email={email}
      />
    );

    UserEvent.click(queryByTestId('edit-button'));

    const emailInput = screen.getByTestId('edit-Email');
    const firstNameInput = screen.getByTestId('edit-First Name');
    const lastNameInput = screen.getByTestId('edit-Last Name');

    expect(emailInput.value).toBe(email);
    expect(firstNameInput.value).toBe(firstName);
    expect(lastNameInput.value).toBe(lastName);

    UserEvent.type(emailInput, 'runner.com');
    expect(emailInput.value).toBe('test@runner.com');

    UserEvent.type(firstNameInput, 'er');
    expect(firstNameInput.value).toBe('Tester');

    UserEvent.type(lastNameInput, 'runner');
    expect(lastNameInput.value).toBe('Runnerrunner');
  });

  it('Profile save button saves changes if successful', async () => {
    const testResponse = {
      authResponseType: REQUEST_SUCCESS,
      authResponsePayload: 'data',
    };

    const getUserPayload = jest.fn();

    server.use(
      rest.put('/api/user/profile', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(testResponse));
      })
    );

    const firstName = 'Test';
    const lastName = 'Runner';
    const email = 'test@runner.com';

    const { queryByTestId } = render(
      <Profile
        isLoggedIn
        firstName={firstName}
        lastName={lastName}
        email={email}
        handleSave={getUserPayload}
        getUserPayload={getUserPayload}
      />
    );

    UserEvent.click(queryByTestId('edit-button'));
    UserEvent.click(queryByTestId('save-button'));

    await waitFor(() => expect(getUserPayload).toHaveBeenCalledTimes(1));
  });
});
