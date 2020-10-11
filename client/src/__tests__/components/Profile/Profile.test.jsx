import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import Profile from '../../../components/Profile/Profile';

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
});
