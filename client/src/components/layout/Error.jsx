import React from 'react';

import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    fontSize: '1rem',
    color: '#ff0000',
    margin: theme.spacing(2, 1, 1),
    display: 'flex',
    justifyContent: 'center',
  },
}));

function Error(props) {
  const classes = useStyles();

  return (
    <Typography className={classes.errorMessage}>
      {props.errorMessage}
    </Typography>
  );
}

export default Error;
