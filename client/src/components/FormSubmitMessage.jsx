import React from 'react';
import {useStylesFormSubmitMsg} from '../Styles';
import {Typography} from '@material-ui/core';

function FormSubmitMessage(props) {
  const classes = useStylesFormSubmitMsg();

  return (
    <Typography className={classes.submitMessage}>
      {props.submitMessage}
    </Typography>
  );
}

export default FormSubmitMessage;
