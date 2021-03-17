import React from 'react';
import { Button, Grid } from '@material-ui/core';

const RecipeButton = (props) => {
  if (props.editMode) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            data-testid="submit-button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={props.handleSubmit}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            data-testid="cancel-button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={props.handleCancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Button
      data-testid="edit-button"
      type="submit"
      fullWidth
      variant="outlined"
      color="primary"
      onClick={props.handleEdit}
    >
      Edit Recipe
    </Button>
  );
};

export default RecipeButton;
