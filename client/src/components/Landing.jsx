import React from 'react';
import RegisterForm from './Auth/RegisterForm';
import {useStylesMain} from '../Styles';
import {Grid} from '@material-ui/core';

function Landing(props) {
  const classes = useStylesMain();

  return (
    <Grid container className='landing-background background-image-full'>
      <Grid item xs={12} sm={4} className={classes.landingPosition}>
        <RegisterForm
          handleLoggedIn={props.handleLoggedIn}
          isLoggedIn={props.isLoggedIn}
        />
      </Grid>
    </Grid>
  );
}

export default Landing;
