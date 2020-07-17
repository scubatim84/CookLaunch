import React from 'react';
import LoginForm from './Auth/LoginForm';
import {CardMedia, Grid} from '@material-ui/core';
import {useStylesMain} from '../Styles';

function Login(props) {
  const classes = useStylesMain();

  return (
    <CardMedia className={classes.loginBackground}>
      <Grid container>
        <Grid
          container
          spacing={0}
          alignItems='center'
          justify='center'
          style={{minHeight: '100vh'}}
        >
          <Grid item xs={12} sm={6}>
            <LoginForm
              key={props.isLoggedIn}
              handleLoggedIn={props.handleLoggedIn}
              isLoggedIn={props.isLoggedIn}
            />
          </Grid>
        </Grid>
      </Grid>
    </CardMedia>
  );
}

export default Login;
