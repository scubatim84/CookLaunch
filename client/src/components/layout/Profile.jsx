import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {getUserData} from '../../actions/authActions';
import {useStylesProfile} from '../../Styles';
import {themeMain} from '../../Theme';
import {Button, CssBaseline, Card, Grid, Typography} from '@material-ui/core';
import ProfileView from './ProfileField';

function Profile(props) {
  const classes = useStylesProfile(themeMain);

  const [isLoggedIn, setLoggedIn] = useState(props.isLoggedIn);
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [editMode, setEditMode] = useState(false);

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

  const handleEdit = async (e) => {
    e.preventDefault();

    setEditMode(true);
  };

  return !isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Grid container className={classes.root}>
      <Grid xs={12} className={classes.submit}>
        <Button
          onClick={handleEdit}
          type='submit'
          variant='contained'
          color='primary'
        >
          Edit Profile
        </Button>
      </Grid>
      <Grid xs={12} sm={4}>
        <Card>
          <Grid xs={12} className={classes.title}>
            <Typography variant='h5'>My Profile</Typography>
          </Grid>
          <Grid container justify='space-between' className={classes.root}>
            <ProfileView
              editMode={editMode}
              label='Email'
              content={user.email}
            />
            <ProfileView
              editMode={editMode}
              label='First Name'
              content={user.firstName}
            />
            <ProfileView
              editMode={editMode}
              label='Last Name'
              content={user.lastName}
            />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Profile;
