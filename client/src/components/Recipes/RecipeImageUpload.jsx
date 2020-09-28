import React, { useState } from 'react';
import Compressor from 'compressorjs';
import { Button, CardMedia, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { themeMain } from '../../Theme';
import CardTitle from '../CardTitle';
import FormSubmitMessage from '../FormSubmitMessage';
import Loader from '../Loader';

function RecipeImageUpload(props) {
  const classes = useStyles(themeMain);

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(undefined);
  const [error, setError] = useState({
    errorMessage: '',
  });

  const handleFileUpload = (event) => {
    setIsLoading(true);

    const image = event.target.files[0];

    setImagePreview({
      name: event.target.files[0].name,
      URL: URL.createObjectURL(event.target.files[0]),
    });

    if (!image) {
      return;
    }

    if (image.size > 10000000) {
      setError({
        errorMessage:
          'Your image is too large! Please upload an image 10MB or less in size.',
      });
    } else {
      new Compressor(image, {
        quality: 0.6,
        convertSize: 500000,
        success(result) {
          props.setRecipeImage({
            file: { image: result },
          });
        },
        error(err) {
          setError({
            errorMessage: err.message,
          });
        },
      });
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} className={classes.title}>
        <CardTitle title={props.cardTitle} />
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
            {props.buttonCaption}
          </Button>
        </label>
      </Grid>
      {imagePreview && (
        <Grid item xs={12}>
          <CardMedia
            className={classes.media}
            image={imagePreview.URL}
            title={imagePreview.name}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        {error.errorMessage.length > 0 && (
          <FormSubmitMessage submitMessage={error.errorMessage} />
        )}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  media: {
    height: 'auto',
    width: '100%',
    paddingTop: '56.25%', // 16:9
  },
  title: {
    marginBottom: theme.spacing(1),
    flexGrow: 1,
  },
}));

export default RecipeImageUpload;
