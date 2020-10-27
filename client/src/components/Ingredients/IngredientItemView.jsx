import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import { Grid } from '@material-ui/core';

import { themeMain } from '../../Theme';
import IngredientText from './IngredientText';
import DeleteButton from '../DeleteButton';

const IngredientItemView = (props) => {
  const classes = useStyles(themeMain);

  return (
    <Grid container spacing={1} alignItems='center'>
      <Grid item xs={5}>
        <IngredientText>{props.name}</IngredientText>
      </Grid>
      <Grid item xs={2}>
        <IngredientText>{props.quantity}</IngredientText>
      </Grid>
      <Grid item xs={3}>
        <IngredientText>{props.quantityType}</IngredientText>
      </Grid>
      <Grid item xs={1}>
        <Edit
          data-testid='edit-icon'
          onClick={props.handleEdit}
          className={classes.icon}
        />
      </Grid>
      <Grid item xs={1}>
        <DeleteButton
          dialog={props.ingredientDialog}
          handleDelete={props.handleDelete}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  icon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

export default IngredientItemView;
