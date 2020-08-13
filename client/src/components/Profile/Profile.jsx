import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import isEmpty from 'is-empty';
import {REQUEST_SUCCESS} from '../../actions/types';
import {updateUserProfile} from '../../actions/userActions';
import ProfileField from './ProfileField';
import ProfileButtons from './ProfileButtons';
import FormSubmitMessage from '../FormSubmitMessage';
import {useStylesMain} from '../../Styles';
import {themeMain} from '../../Theme';
import {Card, Grid} from '@material-ui/core';
import CardTitle from '../CardTitle';
import Loader from '../Loader';

function Profile(props) {
  const classes = useStylesMain(themeMain);

  const [profileData, setProfileData] = useState(null);
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

  const handleChange = (e) => {
    const {name, value} = e.target;

    setProfileData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleEdit = () => {
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

  const handleCancel = () => {
    setProfileData({
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
    });

    setEditMode(false);
  };

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else if (!profileData?.email) {
    return <Loader />;
  } else {
    return (
      <div className={classes.minHeight}>
        <div className={classes.pageMargin}>
          <Grid container>
            <Grid item xs={12} className={classes.buttonMargin}>
              <ProfileButtons
                editMode={editMode}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            </Grid>
            <Card className={classes.pageCard}>
              <div className={classes.paper}>
                <Grid container spacing={1}>
                  <Grid item xs={12} className={classes.title}>
                    <CardTitle title='My Profile' />
                  </Grid>
                  <Grid item xs={12}>
                    <ProfileField
                      editMode={editMode}
                      label='Email'
                      name='email'
                      handleChange={handleChange}
                      content={profileData.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ProfileField
                      editMode={editMode}
                      label='First Name'
                      name='firstName'
                      handleChange={handleChange}
                      content={profileData.firstName}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                </Grid>
              </div>
            </Card>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Profile;
