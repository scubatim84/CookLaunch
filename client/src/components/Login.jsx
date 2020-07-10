import React from 'react';
import LoginForm from './Auth/LoginForm';
import {useStylesLanding} from '../Styles';
import Grid from '@material-ui/core/Grid';

function Login(props) {
  const classes = useStylesLanding();

  return (
    <div className='login-background background-image-full'>
      <div className={classes.root}>
        <Grid
          container
          spacing={0}
          alignItems='center'
          justify='center'
          style={{minHeight: '100vh'}}
        >
          <Grid item xs={6}>
            <LoginForm
              handleLoggedIn={props.handleLoggedIn}
              isLoggedIn={props.isLoggedIn}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Login;
