import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Backdrop,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';

import { useStylesMain } from '../Styles';
import { themeMain } from '../Theme';
import Loader from './Loader';

const Welcome = (props) => {
  const classes = useStylesMain(themeMain);

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  }
  if (!props.firstName) {
    return <Loader />;
  }

  return (
    <div className={classes.minHeight}>
      <Backdrop className={classes.backdrop} open={!props.firstName}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Grid container spacing={2} className={classes.pagePadding}>
        <Grid item xs={12}>
          <Typography id='FirstName' variant='h4' color='textPrimary'>
            Welcome {props.firstName}!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' color='textPrimary'>
            You currently have no recipes. To get started, please follow these
            three steps using the profile menu in the top right part of the
            screen:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' color='textPrimary'>
            1) Add ingredients desired for your first recipe
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' color='textPrimary'>
            2) Add your first recipe
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' color='textPrimary'>
            3) Once you have added a recipe, view it here on your dashboard
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Welcome;
