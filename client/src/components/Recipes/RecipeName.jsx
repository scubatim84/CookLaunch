import React from 'react';
import { TextField } from '@material-ui/core';
import CardTitle from '../CardTitle';

function RecipeName(props) {
  if (props.editMode) {
    return (
      <TextField
        onChange={props.handleChange}
        variant="outlined"
        required
        placeholder={props.name}
        value={props.name}
        id="name"
        name="name"
      />
    );
  }

  return <CardTitle title={props.name} />;
}

export default RecipeName;
