import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {getUserData} from '../../actions/authActions';
import {themeMain} from '../../Theme';
import {useStylesProfile} from '../../Styles';

import {Button, CssBaseline, Card, Grid, Typography} from '@material-ui/core';

function Profile(props) {
  const classes = useStylesProfile(themeMain);

  const [isLoggedIn, setLoggedIn] = useState(props.isLoggedIn);
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    setLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const getUserPayload = async () => {
        const data = await getUserData();
        const userPayload = await data.payload;

        setUser({
          email: userPayload.email,
          firstName: userPayload.firstName,
          lastName: userPayload.lastName,
        });
      };

      getUserPayload();
    }
  }, [isLoggedIn]);

  return !isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <div className={classes.root}>
      <Grid xs={12}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Edit Profile
        </Button>
      </Grid>
      <Grid xs={4}>
        <Card>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography className={classes.title}>My Profile</Typography>
            <Grid container spacing={2} justify='space-between'>
              <Grid item xs={12} sm={6}>
                <Typography className={classes.textLabel}>Email</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className={classes.textContent}>
                  {user.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className={classes.textLabel}>
                  First Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className={classes.textContent}>
                  {user.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className={classes.textLabel}>Last Name</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className={classes.textContent}>
                  {user.lastName}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Card>
      </Grid>
    </div>
  );
}

export default Profile;
