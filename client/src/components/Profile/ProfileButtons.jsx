import React from 'react';
import {Button, Grid} from '@material-ui/core';

function ProfileButtons(props) {
  return props.editMode ? (
    <Grid container>
      <Grid item xs={12} sm={1}>
        <Button
          onClick={props.handleSave}
          type='submit'
          variant='contained'
          color='primary'
        >
          Save
        </Button>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Button
          onClick={props.handleCancel}
          type='submit'
          variant='contained'
          color='primary'
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Button
      onClick={props.handleEdit}
      type='submit'
      variant='contained'
      color='primary'
    >
      Edit Profile
    </Button>
  );
}

export default ProfileButtons;
