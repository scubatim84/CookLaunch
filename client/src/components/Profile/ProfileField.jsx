import React from 'react';
import { Grid } from '@material-ui/core';

import ProfileFieldLabel from './ProfileFieldLabel';
import ProfileFieldContent from './ProfileFieldContent';

const ProfileField = (props) => (
  <Grid container>
    <Grid item xs={4}>
      <ProfileFieldLabel label={props.label} />
    </Grid>
    <Grid item xs={8}>
      <ProfileFieldContent
        handleChange={props.handleChange}
        label={props.label}
        name={props.name}
        editMode={props.editMode}
        content={props.content}
      />
    </Grid>
  </Grid>
);

export default ProfileField;
