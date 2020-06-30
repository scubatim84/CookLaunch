import React from 'react';

import {Grid, Typography} from '@material-ui/core';

import {Edit, Delete} from '@material-ui/icons';

function PantryItem(props) {
  const handleDelete = () => {
    props.handleDelete(props.userEmail, props.id);
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>{props.name}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>{props.quantity}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{props.quantityType}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Edit className='icon' />
      </Grid>
      <Grid item xs={1}>
        <Delete onClick={handleDelete} className='icon' />
      </Grid>
    </Grid>
  );
}

export default PantryItem;
