import React, {useState} from 'react';
import isEmpty from 'is-empty';
import {ingredientQuantityTypes} from '../../actions/types';
import FormSubmitMessage from '../FormSubmitMessage';
import {Button, Grid, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CardTitle from '../CardTitle';

function RecipeIngredientAdd(props) {
  const [addIngredient, setAddIngredient] = useState({
    id: '',
    name: '',
    quantity: '',
    quantityType: '',
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  const handleAutocompleteName = async (event, ingredient) => {
    if (!isEmpty(ingredient)) {
      setAddIngredient((prevValue) => {
        return {
          ...prevValue,
          id: ingredient._id,
          name: ingredient.name,
        };
      });
    }
  };

  const handleAutocompleteQuantityType = async (event, ingredientType) => {
    if (!isEmpty(ingredientType)) {
      setAddIngredient((prevValue) => {
        return {
          ...prevValue,
          quantityType: ingredientType,
        };
      });
    }
  };

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setAddIngredient((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      props.addIngredientToRecipe(addIngredient);
    } catch (err) {
      setError({
        errorMessage: err,
      });
    }
  };

  return (
    <form noValidate>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} align='center'>
          <CardTitle title='Add Ingredient To Recipe' />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Autocomplete
            id='ingredients'
            options={props.ingredients}
            onChange={handleAutocompleteName}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label='Ingredient Name'
                variant='outlined'
                id='name'
                name='name'
              />
            )}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            onChange={handleChange}
            variant='outlined'
            required
            value={addIngredient.quantity}
            label='Quantity'
            id='quantity'
            name='quantity'
          />
        </Grid>
        <Grid item xs={8} sm={3}>
          <Autocomplete
            id='ingredientQuantityTypes'
            options={ingredientQuantityTypes}
            onChange={handleAutocompleteQuantityType}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label='Quantity Type'
                variant='outlined'
                id='quantityType'
                name='quantityType'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            onClick={handleSubmit}
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
          >
            Add
          </Button>
        </Grid>
        <Grid item xs={12}>
          {!isEmpty(error.errorMessage) && (
            <FormSubmitMessage submitMessage={error.errorMessage} />
          )}
        </Grid>
      </Grid>
    </form>
  );
}

export default RecipeIngredientAdd;
