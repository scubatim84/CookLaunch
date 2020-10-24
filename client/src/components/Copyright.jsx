import React from 'react';
import { Link, Typography } from '@material-ui/core';

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary'>
      {'Copyright © '}
      <Link color='inherit' href='http://www.cooklaunch.com'>
        Cook Launch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
