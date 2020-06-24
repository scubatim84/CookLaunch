import React from 'react';

import ResetPasswordByEmailForm from '../auth/ResetPasswordByEmailForm';

import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function ResetPassword(props) {
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
