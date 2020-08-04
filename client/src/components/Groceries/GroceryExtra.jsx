import React, {useState} from 'react';
import isEmpty from 'is-empty';
import {ingredientQuantityTypes} from '../../actions/types';
import {useStylesMain} from '../../Styles';
import {themeMain} from '../../Theme';
import {Button, Card, Grid, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormSubmitMessage from '../FormSubmitMessage';
import CardTitle from '../CardTitle';

function GroceryExtra(props) {
  const classes = useStylesMain(themeMain);

  const [addIngredient, setAddIngredient] = useState({
    name: '',
    quantity: '',
    quantityType: '',
    groceryExtra: true,
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

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

    const foundIngredient = props.pantry.find(
      (ingredient) => ingredient.name === addIngredient.name
    );

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
              <CardTitle title={`Add Extras To ${props.name}`} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={handleChange}
                variant='outlined'
                required
                value={addIngredient.name}
                label='Ingredient Name'
                id='name'
                name='name'
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

export default GroceryExtra;
