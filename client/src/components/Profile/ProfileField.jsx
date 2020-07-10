import React from 'react';
import {Grid} from '@material-ui/core';
import ProfileFieldLabel from './ProfileFieldLabel';
import ProfileFieldContent from './ProfileFieldContent';
import {useStylesProfile} from '../../Styles';
import {themeMain} from '../../Theme';

function ProfileField(props) {
  const classes = useStylesProfile(themeMain);

  return (
    <Grid container>
      <Grid item xs={12} sm={6} className={classes.field}>
        <ProfileFieldLabel label={props.label} />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.field}>
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
}

export default ProfileField;
