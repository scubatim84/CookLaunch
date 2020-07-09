import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useStylesProfile} from '../../Styles';
import {themeMain} from '../../Theme';
import {Card, Grid, Typography} from '@material-ui/core';
import ProfileField from './ProfileField';
import ProfileButtons from './ProfileButtons';

function Profile(props) {
  const classes = useStylesProfile(themeMain);

  const [profileData, setProfileData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setProfileData({
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
    });
  }, [props]);

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setProfileData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleEdit = async (e) => {
    setEditMode(true);
  };

  const handleSave = async (e) => {
    setEditMode(false);
  };

  const handleCancel = async (e) => {
    setProfileData({
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
    });

    setEditMode(false);
  };

  return !props.isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.submit}>
        <ProfileButtons
          editMode={editMode}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Card>
          <Grid item xs={12} className={classes.title}>
            <Typography variant='h5'>My Profile</Typography>
          </Grid>
          <Grid container justify='space-between' className={classes.root}>
            <ProfileField
              editMode={editMode}
              label='Email'
              name='email'
              handleChange={handleChange}
              content={profileData.email}
            />
            <ProfileField
              editMode={editMode}
              label='First Name'
              name='firstName'
              handleChange={handleChange}
              content={profileData.firstName}
            />
            <ProfileField
              editMode={editMode}
              label='Last Name'
              name='lastName'
              handleChange={handleChange}
              content={profileData.lastName}
            />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Profile;
