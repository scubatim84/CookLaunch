import React from 'react';
import {TextField, Typography} from '@material-ui/core';

function ProfileFieldContent(props) {
  return props.editMode ? (
    <TextField
      onChange={props.handleChange}
      value={props.content}
      variant='outlined'
      label={props.label}
      name={props.name}
      size='small'
    />
  ) : (
    <Typography variant='subtitle1'>{props.content}</Typography>
  );
}

export default ProfileFieldContent;
