import React from 'react';
import {Typography} from '@material-ui/core';

function RecipeName(props) {
  return (
    <Typography component='h1' variant='h5'>
      {props.name}
    </Typography>
  );
}

export default RecipeName;
