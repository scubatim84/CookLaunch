import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {ingredientQuantityTypes, REQUEST_SUCCESS} from '../../actions/types';
import {addIngredientToPantry} from '../../actions/pantryActions';
import isEmpty from 'is-empty';
import FormSubmitMessage from './FormSubmitMessage';
import {getIngredients} from '../../actions/ingredientActions';
import _ from 'lodash';

function PantryAdd(props) {
  const classes = useStylesForm(themeMain);

  const [ingredients, setIngredients] = useState({data: []});
  const [addIngredient, setAddIngredient] = useState({
    name: '',
    quantity: '',
    quantityType: '',
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  const getIngredientData = async () => {
    const response = await getIngredients();

    // Format ingredient names to title case
    response.authResponsePayload.forEach((ingredient) => {
      ingredient.name = _.startCase(_.toLower(ingredient.name));
    });

    setIngredients({data: response.authResponsePayload});
  };

  useEffect(() => {
    getIngredientData();
  }, [props]);

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

    const requestResponse = await addIngredientToPantry(
      props.userEmail,
      addIngredient
    );

    if (requestResponse.authResponseType === REQUEST_SUCCESS) {
      // If adding ingredient is successful, clear form
      setAddIngredient({
        name: '',
        quantity: '',
        quantityType: '',
      });

      // If adding ingredient is successful, clear old errors
      setError({
        errorMessage: '',
      });

      // Update pantry
      await props.updatePantry();
    } else {
      setError({
        errorMessage: requestResponse.authResponsePayload,
      });
    }
  };

  return (
    <Card className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <form noValidate>
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} align='center'>
              <Typography component='h1' variant='h5'>
                Add Ingredients To Pantry
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Autocomplete
                id='ingredients'
                options={ingredients.data}
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
            <Grid item xs={12} sm={2}>
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
            <Grid item xs={12} sm={3}>
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
                className={classes.submit}
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
      </div>
    </Card>
  );
}

export default PantryAdd;
