import React from 'react';
import {useStylesMain} from '../Styles';
import {Typography} from '@material-ui/core';

function FormSubmitMessage(props) {
  const classes = useStylesMain();

  return (
    <Typography className={classes.formSubmitMessage}>
      {props.submitMessage}
    </Typography>
  );
}

export default FormSubmitMessage;
