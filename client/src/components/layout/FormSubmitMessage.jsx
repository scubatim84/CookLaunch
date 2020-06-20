import React from 'react';

import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submitMessage: {
    fontSize: '1rem',
    color: '#ff0000',
    margin: theme.spacing(2, 1, 1),
    display: 'flex',
    justifyContent: 'center',
  },
}));

function FormSubmitMessage(props) {
  const classes = useStyles();

  return (
    <Typography className={classes.submitMessage}>
      {props.submitMessage}
    </Typography>
  );
}

export default FormSubmitMessage;
