import React from 'react';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';

import {Grid, Typography} from '@material-ui/core';

import {Edit, Delete} from '@material-ui/icons';

function PantryItem(props) {
  const classes = useStylesForm(themeMain);

  const handleDelete = () => {
    props.handleDelete(props.userEmail, props.id);
  };

  return (
    <Grid container className={classes.form}>
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
        <Edit />
      </Grid>
      <Grid item xs={1}>
        <Delete onClick={handleDelete} />
      </Grid>
    </Grid>
  );
}

export default PantryItem;
