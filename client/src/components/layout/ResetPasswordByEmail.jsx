import React from 'react';

import ResetPasswordByEmailForm from '../auth/ResetPasswordByEmailForm';

import Grid from '@material-ui/core/Grid';

function ResetPassword(props) {
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
            <ResetPasswordByEmailForm
              handleLoggedIn={props.handleLoggedIn}
              isLoggedIn={props.isLoggedIn}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ResetPassword;
