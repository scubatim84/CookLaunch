import React from 'react';
import {Button, Grid} from '@material-ui/core';

function RecipeButton(props) {
  if (props.editMode) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={props.handleSubmit}
          >
            Submit Changes
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={props.handleCancel}
          >
            Cancel Changes
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
