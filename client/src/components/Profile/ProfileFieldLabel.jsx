import React from 'react';
import { Typography } from '@material-ui/core';

function ProfileFieldLabel(props) {
  return <Typography variant='subtitle1'>{props.label}</Typography>;
}

export default ProfileFieldLabel;
