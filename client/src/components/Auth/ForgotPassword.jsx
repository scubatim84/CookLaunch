import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import {CardMedia, Grid} from '@material-ui/core';
import {useStylesMain} from '../../Styles';

function ForgotPassword() {
  const classes = useStylesMain();

  return (
    <CardMedia className={classes.loginBackground}>
      <Grid
        container
        alignItems='center'
        justify='center'
        style={{minHeight: '100vh'}}
      >
        <Grid item xs={12} sm={6}>
          <ForgotPasswordForm />
        </Grid>
      </Grid>
    </CardMedia>
  );
}

export default ForgotPassword;
