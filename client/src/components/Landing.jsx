import React from 'react';
import { CardMedia, Grid } from '@material-ui/core';

import RegisterForm from './Auth/RegisterForm';
import { useStylesMain } from '../Styles';

const Landing = (props) => {
  const classes = useStylesMain();

  return (
    <CardMedia className={classes.landingBackground}>
      <Grid container style={{ minHeight: '100vh' }}>
        <Grid
          item
          xs={10}
          sm={6}
          md={5}
          lg={4}
          className={classes.landingPosition}
        >
          <RegisterForm
            handleLoggedIn={props.handleLoggedIn}
            isLoggedIn={props.isLoggedIn}
          />
        </Grid>
      </Grid>
    </CardMedia>
  );
};

export default Landing;
