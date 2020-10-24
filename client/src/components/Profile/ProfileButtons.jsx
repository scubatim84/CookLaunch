import React from 'react';
import { Button, Grid } from '@material-ui/core';

const ProfileButtons = (props) => {
  if (props.editMode) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={3} sm={2} md={1}>
          <Button
            data-testid='save-button'
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
            data-testid='cancel-button'
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
  }

  return (
    <Button
      data-testid='edit-button'
      onClick={props.handleEdit}
      id='Edit'
      type='submit'
      variant='contained'
      color='primary'
    >
      Edit Profile
    </Button>
  );
};

export default ProfileButtons;
