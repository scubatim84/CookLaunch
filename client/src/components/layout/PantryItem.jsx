import React, {useState, useEffect} from 'react';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';

import {Grid, Typography} from '@material-ui/core';

import {Edit, Delete} from '@material-ui/icons';

function PantryItem(props) {
  const classes = useStylesForm(themeMain);

  return (
    <Grid container>
      <Grid xs={6}>
        <Typography>{props.name}</Typography>
      </Grid>
      <Grid xs={1}>
        <Typography>{props.quantity}</Typography>
      </Grid>
      <Grid xs={3}>
        <Typography>{props.quantityType}</Typography>
      </Grid>
      <Grid xs={1}>
        <Edit />
      </Grid>
      <Grid xs={1}>
        <Delete />
      </Grid>
    </Grid>
  );
}

export default PantryItem;
