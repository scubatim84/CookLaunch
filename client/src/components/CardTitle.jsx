import React from 'react';
import {Typography} from '@material-ui/core';

function CardTitle(props) {
  return (
    <Typography component='h1' variant='h5'>
      {props.title}
    </Typography>
  );
}

export default CardTitle;
