import React from 'react';
import isEmpty from 'is-empty';
import { makeStyles } from '@material-ui/core/styles';
import { Cancel, Done } from '@material-ui/icons';
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

import { themeMain } from '../../Theme';
import { ingredientQuantityTypes } from '../../actions/types';
import FormSubmitMessage from '../FormSubmitMessage';
import IngredientText from './IngredientText';

const useStyles = makeStyles((theme) => ({
  icon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const IngredientItemEdit = (props) => {
  const classes = useStyles(themeMain);

  return (
    <Grid container alignItems="center">
      <Grid item xs={4}>
        {props.editIngredient.groceryExtra ? (
          <TextField
            inputProps={{ 'data-testid': 'grocery-edit-name' }}
            onChange={props.handleChange}
            variant="outlined"
            required
            placeholder={props.editIngredient.name}
            value={props.editIngredient.name}
            id="name"
            name="name"
            autoComplete="name"
          />
        ) : (
          <IngredientText>{props.name}</IngredientText>
        )}
      </Grid>
      <Grid item xs={2}>
        <TextField
          inputProps={{ 'data-testid': 'edit-quantity' }}
          onChange={props.handleChange}
          variant="outlined"
          required
          placeholder={props.editIngredient.quantity.toString()}
          value={props.editIngredient.quantity}
          id="quantity"
          name="quantity"
          autoComplete="quantity"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControl>
          <Select
            inputProps={{
              'data-testid': 'select-quantity-type',
            }}
            labelId="quantityType"
            id="quantityType"
            required
            placeholder={props.editIngredient.quantityType}
            value={props.editIngredient.quantityType}
            onChange={props.handleSelect}
          >
            {ingredientQuantityTypes.map((quantityType) => (
              <MenuItem key={quantityType + new Date()} value={quantityType}>
                {quantityType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <Done
          data-testid="done-icon"
          onClick={props.handleSubmit}
          className={classes.icon}
        />
      </Grid>
      <Grid item xs={1}>
        <Cancel
          data-testid="cancel-icon"
          onClick={props.handleCancel}
          className={classes.icon}
        />
      </Grid>
      <Grid item xs={12}>
        {!isEmpty(props.error.message) && (
          <FormSubmitMessage submitMessage={props.error.message} />
        )}
      </Grid>
    </Grid>
  );
};

export default IngredientItemEdit;
