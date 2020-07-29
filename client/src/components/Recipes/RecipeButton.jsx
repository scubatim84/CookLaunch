import React from 'react';
import {Button, Grid} from '@material-ui/core';

function RecipeButton(props) {
  if (props.editMode) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={props.handleSubmit}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={props.handleCancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        onClick={props.handleEdit}
      >
        Edit Recipe
      </Button>
    );
  }
}

export default RecipeButton;
