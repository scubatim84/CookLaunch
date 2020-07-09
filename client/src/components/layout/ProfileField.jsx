import React from 'react';
import {useStylesProfile} from '../../Styles';
import {themeMain} from '../../Theme';
import {Grid, Typography} from '@material-ui/core';

function ProfileField(props) {
  const classes = useStylesProfile(themeMain);

  return props.editMode ? (
    <div></div>
  ) : (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Typography variant='subtitle1'>{props.label}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant='subtitle1'>{props.content}</Typography>
      </Grid>
    </Grid>
  );
}

export default ProfileField;
