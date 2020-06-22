import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {getUserData} from '../../actions/authActions';
import isEmpty from 'is-empty';

import {Typography} from '@material-ui/core';

function Dashboard(props) {
  const [isLoggedIn, setLoggedIn] = useState(props.isLoggedIn);
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    setLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const getUserPayload = async () => {
        const data = await getUserData();
        const userPayload = await data.payload;

        setUser({
          email: userPayload.email,
          firstName: userPayload.firstName,
          lastName: userPayload.lastName,
        });
      };

      getUserPayload();
    }
  }, [isLoggedIn]);

  return !isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Typography>
      Welcome {!isEmpty(user.firstName) && user.firstName}
    </Typography>
  );
}

export default Dashboard;
