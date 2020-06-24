import React from 'react';

import ForgotPasswordForm from '../auth/ForgotPasswordForm';

import {Grid} from '@material-ui/core';

function ForgotPassword() {
  return (
    <div className='login-background background-image-full'>
      <div>
        <Grid
          container
          spacing={0}
          alignItems='center'
          justify='center'
          style={{minHeight: '100vh'}}
        >
          <Grid item xs={6}>
            <ForgotPasswordForm />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ForgotPassword;
