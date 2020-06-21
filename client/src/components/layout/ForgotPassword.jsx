import React from 'react';

import ForgotPasswordForm from '../auth/ForgotPasswordForm';

import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function ForgotPassword() {
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
            <ForgotPasswordForm />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ForgotPassword;
