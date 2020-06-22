import React from 'react';
import {useStylesFormSubmitMsg} from '../../Styles';
import {themeMain} from '../../Theme';

import {Typography} from '@material-ui/core';

function FormSubmitMessage(props) {
  const classes = useStylesFormSubmitMsg(themeMain);

  return (
    <Typography className={classes.submitMessage}>
      {props.submitMessage}
    </Typography>
  );
}

export default FormSubmitMessage;
