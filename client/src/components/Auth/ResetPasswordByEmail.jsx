import React from 'react';
import { CardMedia, Grid } from '@material-ui/core';

import ResetPasswordByEmailForm from './ResetPasswordByEmailForm';
import useStylesMain from '../../Styles';

const ResetPassword = (props) => {
  const classes = useStylesMain();

  return (
    <CardMedia className={classes.loginBackground}>
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} sm={6}>
          <ResetPasswordByEmailForm
            key={props.isLoggedIn}
            handleLoggedIn={props.handleLoggedIn}
            isLoggedIn={props.isLoggedIn}
          />
        </Grid>
      </Grid>
    </CardMedia>
  );
};

export default ResetPassword;
