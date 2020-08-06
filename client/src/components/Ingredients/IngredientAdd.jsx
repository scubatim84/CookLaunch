import React, {useState} from 'react';
import isEmpty from 'is-empty';
import _ from 'lodash';
import {ingredientQuantityTypes} from '../../actions/types';
import {useStylesMain} from '../../Styles';
import {themeMain} from '../../Theme';
import {Button, Card, Grid, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormSubmitMessage from '../FormSubmitMessage';
import CardTitle from '../CardTitle';

function IngredientAdd(props) {
  const classes = useStylesMain(themeMain);

  const [addIngredient, setAddIngredient] = useState({
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

    let foundIngredient;

    if (props.groceryListAdd) {
      foundIngredient = props.groceries.find(
        (ingredient) =>
          _.lowerCase(ingredient.name) === _.lowerCase(addIngredient.name)
      );
    } else {
      foundIngredient = props.pantry.find(
        (ingredient) =>
          _.lowerCase(ingredient.name) === _.lowerCase(addIngredient.name)
      );
    }

    if (foundIngredient) {
      setError({
        errorMessage: 'That ingredient already exists.',
      });
    } else {
      const response = await props.handleAddIngredient(addIngredient);

      if (!isEmpty(response)) {
        setError({
          errorMessage: response,
        });
      }
    }
  };

  return (
    <Card>
      <form noValidate>
        <div className={classes.paper}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12}>
              <CardTitle title={`Add Ingredients To ${props.name}`} />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={5}>
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
            <Grid item xs={7}>
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
            <Grid item xs={12}>
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
        </div>
      </form>
    </Card>
  );
}

export default IngredientAdd;
