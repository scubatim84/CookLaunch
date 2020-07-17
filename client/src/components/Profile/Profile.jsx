import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import isEmpty from 'is-empty';
import {REQUEST_SUCCESS} from '../../actions/types';
import {updateUserProfile} from '../../actions/userActions';
import ProfileField from './ProfileField';
import ProfileButtons from './ProfileButtons';
import FormSubmitMessage from '../FormSubmitMessage';
import {useStylesProfile} from '../../Styles';
import {themeMain} from '../../Theme';
import {Card, Grid} from '@material-ui/core';
import CardTitle from '../CardTitle';

function Profile(props) {
  const classes = useStylesProfile(themeMain);

  const [profileData, setProfileData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    setProfileData({
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
    });

    setEditMode(false);

    setError({
      errorMessage: '',
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

  const handleEdit = async () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    const requestResponse = await updateUserProfile(profileData);

    if (requestResponse.authResponseType === REQUEST_SUCCESS) {
      props.getUserPayload();
    } else {
      setError({
        errorMessage: requestResponse.authResponsePayload,
      });
    }
  };

  const handleCancel = async () => {
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
            <CardTitle title='My Profile' />
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
          <Grid item xs={12}>
            {!isEmpty(error.errorMessage) && (
              <FormSubmitMessage submitMessage={error.errorMessage} />
            )}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Profile;
