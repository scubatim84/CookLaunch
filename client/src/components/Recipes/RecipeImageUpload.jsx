import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { themeMain } from '../../Theme';
import CardTitle from '../CardTitle';
import FormSubmitMessage from '../FormSubmitMessage';

function RecipeImageUpload(props) {
  const classes = useStyles(themeMain);

  const [error, setError] = useState({
    errorMessage: '',
  });

  const handleFileUpload = (event) => {
    const image = event.target.files[0];

    if (!image) {
      return;
    }

    if (image && image.size > 10000000) {
      setError({
        errorMessage:
          'Your image is too large! Please upload an image 200KB or less in size.',
      });
    } else if (image) {
      props.setRecipeImage({
        file: { image },
      });
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.title}>
        <CardTitle title='New Recipe Image' />
      </Grid>
      <Grid item xs={12}>
        <input
          id='raised-button-file'
          accept='image/*'
          style={{ display: 'none' }}
          type='file'
          onChange={handleFileUpload}
        />
        <label htmlFor='raised-button-file'>
          <Button type='submit' variant='outlined' component='span'>
            Add File To Upload
          </Button>
        </label>
      </Grid>
      <Grid item xs={12}>
        {error.errorMessage.length > 0 && (
          <FormSubmitMessage submitMessage={error.errorMessage} />
        )}
      </Grid>
      {props.recipeImage.file.image && (
        <Grid item xs={12}>
          <Typography>{props.recipeImage.file.image.name} uploaded</Typography>
        </Grid>
      )}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(1),
    flexGrow: 1,
  },
}));

export default RecipeImageUpload;
