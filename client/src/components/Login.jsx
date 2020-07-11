import React from 'react';
import LoginForm from './Auth/LoginForm';
import Grid from '@material-ui/core/Grid';

function Login(props) {
  return (
    <Grid container className='login-background background-image-full'>
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
  );
}

export default Login;
