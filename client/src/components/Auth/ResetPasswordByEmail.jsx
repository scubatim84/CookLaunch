import React from 'react';
import ResetPasswordByEmailForm from './ResetPasswordByEmailForm';
import {useStylesMain} from '../../Styles';
import {CardMedia, Grid} from '@material-ui/core';

function ResetPassword(props) {
  const classes = useStylesMain();

  return (
    <CardMedia className={classes.loginBackground}>
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
    </CardMedia>
  );
}

export default ResetPassword;
