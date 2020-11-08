import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { loginUser } from '../actions/authActions';
import Loader from './Loader';

const UserTour = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const userTourLogin = {
    email: 'user@tour.com',
    password: 'usertour',
  };

  const loginTourUser = useCallback(async () => {
    if (!props.isLoggedIn) {
      const loginResponse = await loginUser(userTourLogin);

      if (loginResponse.status === 200) {
        // If login request is successful, set user as logged in
        props.handleLoggedIn(true);
      }
    }

    setIsLoading(false);
  }, [props, userTourLogin]);

  useEffect(() => {
    loginTourUser();
  }, [loginTourUser]);

  if (props.isLoggedIn) {
    return <Redirect to='/dashboard' />;
  }

  if (isLoading) {
    return <Loader data-testid='loader' />;
  }

  return <Redirect to='/' />;
};

export default UserTour;
