import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { loginUser } from '../actions/authActions';
import Loader from './Loader';

const UserTour = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const loginTourUser = useCallback(async () => {
    const userTourLogin = {
      email: 'user@tour.com',
      password: 'usertour',
    };

    if (!props.isLoggedIn) {
      const loginResponse = await loginUser(userTourLogin);

      if (loginResponse.status === 200) {
        // If login request is successful, set user as logged in
        props.handleLoggedIn(true);
      }
    }

    setIsLoading(false);
  }, [props]);

  useEffect(() => {
    loginTourUser();
  }, [loginTourUser]);

  if (props.isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  if (isLoading) {
    return <Loader data-testid="loader" />;
  }

  return <Redirect to="/" />;
};

export default UserTour;
