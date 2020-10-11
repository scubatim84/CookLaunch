import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
