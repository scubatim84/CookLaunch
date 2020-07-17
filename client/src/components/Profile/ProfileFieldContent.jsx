import React from 'react';
import {TextField, Typography} from '@material-ui/core';

function ProfileFieldContent(props) {
  if (props.editMode) {
    return (
      <TextField
        onChange={props.handleChange}
        value={props.content}
        variant='outlined'
        label={props.label}
        name={props.name}
        size='small'
      />
    );
  } else {
    return <Typography variant='subtitle1'>{props.content}</Typography>;
  }
}

export default ProfileFieldContent;
