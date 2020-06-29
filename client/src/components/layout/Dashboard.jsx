import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {getUserData} from '../../actions/authActions';

import Ingredients from './Ingredients';
import Pantry from './Pantry';

import {Grid} from '@material-ui/core';

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
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Ingredients
          handleLoggedIn={props.handleLoggedIn}
          isLoggedIn={props.isLoggedIn}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Pantry
          handleLoggedIn={props.handleLoggedIn}
          isLoggedIn={props.isLoggedIn}
        />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
