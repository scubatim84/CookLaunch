import React from 'react';
import {Link, Typography} from '@material-ui/core';

function Brand() {
  return (
    <Link href='/'>
      <Typography variant='h4' color='textPrimary'>
        Cook Launch
      </Typography>
    </Link>
  );
}

export default Brand;
