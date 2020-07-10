import React from 'react';
import LoginForm from './Auth/LoginForm';
import {useStylesMain} from '../Styles';
import Grid from '@material-ui/core/Grid';

function Login(props) {
  const classes = useStylesMain();

  return (
    <Grid container className='login-background background-image-full'>
      <Grid
        container
        spacing={0}
        alignItems='center'
        justify='center'
        style={{minHeight: '100vh'}}
        className={classes.root}
      >
        <Grid item xs={6}>
          <LoginForm
            handleLoggedIn={props.handleLoggedIn}
            isLoggedIn={props.isLoggedIn}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
