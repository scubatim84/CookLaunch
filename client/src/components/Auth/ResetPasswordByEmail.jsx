import React from 'react';
import ResetPasswordByEmailForm from './ResetPasswordByEmailForm';
import {useStylesMain} from '../../Styles';
import Grid from '@material-ui/core/Grid';

function ResetPassword(props) {
  const classes = useStylesMain();

  return (
    <div className='login-background background-image-full'>
      <Grid
        container
        spacing={0}
        alignItems='center'
        justify='center'
        style={{minHeight: '100vh'}}
        className={classes.root}
      >
        <Grid item xs={6}>
          <ResetPasswordByEmailForm
            key={props.isLoggedIn}
            handleLoggedIn={props.handleLoggedIn}
            isLoggedIn={props.isLoggedIn}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ResetPassword;
