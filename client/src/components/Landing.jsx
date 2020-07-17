import React from 'react';
import RegisterForm from './Auth/RegisterForm';
import {useStylesMain} from '../Styles';
import {CardMedia, Grid} from '@material-ui/core';

function Landing(props) {
  const classes = useStylesMain();

  return (
    <CardMedia className={classes.landingBackground}>
      <Grid container>
        <Grid item xs={12} sm={4} className={classes.landingPosition}>
          <RegisterForm
            handleLoggedIn={props.handleLoggedIn}
            isLoggedIn={props.isLoggedIn}
          />
        </Grid>
      </Grid>
    </CardMedia>
  );
}

export default Landing;
