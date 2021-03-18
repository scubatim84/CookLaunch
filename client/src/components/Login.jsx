import React from 'react';
import { CardMedia, Grid } from '@material-ui/core';

import LoginForm from './Auth/LoginForm';
import useStylesMain from '../Styles';

const Login = (props) => {
  const classes = useStylesMain();

  return (
    <CardMedia className={classes.loginBackground}>
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} sm={6}>
          <LoginForm
            key={props.isLoggedIn}
            handleLoggedIn={props.handleLoggedIn}
            isLoggedIn={props.isLoggedIn}
          />
        </Grid>
      </Grid>
    </CardMedia>
  );
};

export default Login;
