import React from 'react';
import LoginForm from '../auth/LoginForm';

import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Login(props) {
  const classes = useStyles();

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
          <Grid className={classes.position} item xs={6}>
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
