import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useStylesMain } from '../Styles';
import { themeMain } from '../Theme';
import { addRecipeImage } from '../actions/recipeActions';

const FileUpload = () => {
  const classes = useStylesMain(themeMain);

  const [file, setFile] = useState(null);

  const submitFile = async () => {
    const formData = new FormData();
    formData.append('file', file.image[0]);

    const response = await addRecipeImage(formData);

    console.log(response);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files;

    setFile({ image: uploadedFile });
  };

  return (
    <div>
      <input
        id='raised-button-file'
        accept='image/*'
        className={classes.input}
        style={{ display: 'none' }}
        type='file'
        onChange={handleFileUpload}
      />
      <label htmlFor='raised-button-file'>
        <Button
          type='submit'
          variant='outlined'
          component='span'
          className={classes.button}
        >
          Add File To Upload
        </Button>
      </label>
      <Button variant='outlined' onClick={submitFile}>
        Upload File
      </Button>
    </div>
  );
};

export default FileUpload;
