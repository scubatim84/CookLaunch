import React from 'react';
import { TextField, Typography } from '@material-ui/core';

const ProfileFieldContent = (props) => {
  if (props.editMode) {
    return (
      <TextField
        inputProps={{ 'data-testid': 'edit-' + props.label }}
        onChange={props.handleChange}
        value={props.content}
        variant='outlined'
        label={props.label}
        name={props.name}
        size='small'
      />
    );
  }

  return (
    <Typography variant='subtitle1' data-testid={'view-' + props.label}>
      {props.content}
    </Typography>
  );
};

export default ProfileFieldContent;
