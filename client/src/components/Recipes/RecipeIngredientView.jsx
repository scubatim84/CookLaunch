import React from 'react';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {Grid, Typography} from '@material-ui/core';

function RecipeIngredientView(props) {
  const classes = useStylesForm(themeMain);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={8}>
        <Typography>{props.name}</Typography>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Typography>{props.quantity}</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography>{props.quantityType}</Typography>
      </Grid>
    </Grid>
  );
}

export default RecipeIngredientView;
