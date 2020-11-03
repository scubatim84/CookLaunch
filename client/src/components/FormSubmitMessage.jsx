import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const FormSubmitMessage = (props) => {
  const classes = useStyles();

  return (
    <Typography
      data-testid='form-submit-message'
      id='Message'
      className={classes.formSubmitMessage}
    >
      {props.submitMessage}
    </Typography>
  );
};

const useStyles = makeStyles(() => ({
  formSubmitMessage: {
    fontSize: '1rem',
    color: '#ff0000',
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default FormSubmitMessage;
