import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, Grid } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import { themeMain } from '../../Theme';
import IngredientText from './IngredientText';
import DeleteButton from '../DeleteButton';

const IngredientItemGrocery = (props) => {
  const classes = useStyles(themeMain);

  return (
    <Grid container alignItems='center'>
      <Grid item xs={2}>
        <Checkbox
          data-testid={
            props.editIngredient.checked
              ? 'grocery-checkbox-checked'
              : 'grocery-checkbox-unchecked'
          }
          checked={props.editIngredient.checked}
          onChange={props.handleCheck}
          color='primary'
        />
      </Grid>
      <Grid item xs={3}>
        <IngredientText checked={props.editIngredient.checked}>
          {props.name}
        </IngredientText>
      </Grid>
      <Grid item xs={2}>
        <IngredientText checked={props.editIngredient.checked}>
          {props.quantity}
        </IngredientText>
      </Grid>
      <Grid item xs={3}>
        <IngredientText checked={props.editIngredient.checked}>
          {props.quantityType}
        </IngredientText>
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
          id={props.id}
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

export default IngredientItemGrocery;
