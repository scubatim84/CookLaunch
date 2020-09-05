import React from 'react';
import {Button, Grid} from '@material-ui/core';

function ProfileButtons(props) {
  if (props.editMode) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={3} sm={2} md={1}>
          <Button
            onClick={props.handleSave}
            id='Save'
            type='submit'
            variant='contained'
            color='primary'
          >
            Save
          </Button>
        </Grid>
        <Grid item xs={3} sm={2} md={1}>
          <Button
            onClick={props.handleCancel}
            id='Cancel'
            type='submit'
            variant='contained'
            color='primary'
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Button
        onClick={props.handleEdit}
        id='Edit'
        type='submit'
        variant='contained'
        color='primary'
      >
        Edit Profile
      </Button>
    );
  }
}

export default ProfileButtons;
