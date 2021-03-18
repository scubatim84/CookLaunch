import React from 'react';
import { Typography } from '@material-ui/core';

const CardTitle = (props) => (
  <Typography id="Title" component="h1" variant="h5">
    {props.title}
  </Typography>
);

export default CardTitle;
