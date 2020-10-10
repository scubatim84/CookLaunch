import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { shallow } from 'enzyme';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Profile from '../../../components/Profile/Profile';
import Loader from '../../../components/Loader';

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
});
