import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import {Grid} from '@material-ui/core';

function ForgotPassword() {
  return (
    <div className='login-background background-image-full'>
      <Grid
        container
        alignItems='center'
        justify='center'
        style={{minHeight: '100vh'}}
      >
        <Grid item xs={6}>
          <ForgotPasswordForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default ForgotPassword;
