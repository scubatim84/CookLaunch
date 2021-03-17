import React, { useState } from 'react';
import isEmpty from 'is-empty';
import {
  Button,
  Card,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ingredientQuantityTypes } from '../../actions/types';
import useStylesMain from '../../Styles';
import { themeMain } from '../../Theme';
import FormSubmitMessage from '../FormSubmitMessage';
import CardTitle from '../CardTitle';

function IngredientAdd(props) {
  const classes = useStylesMain(themeMain);

  const [addIngredient, setAddIngredient] = useState({
    name: '',
    quantity: 1,
    quantityType: ingredientQuantityTypes[1],
    groceryExtra: false,
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  const handleAutocompleteName = (event, ingredient) => {
    if (!isEmpty(ingredient)) {
      setAddIngredient((prevValue) => ({
        ...prevValue,
        name: ingredient.name,
      }));
    }
  };

  const handleAutocompleteQuantityType = (event, ingredientType) => {
    if (!isEmpty(ingredientType)) {
      setAddIngredient((prevValue) => ({
        ...prevValue,
        quantityType: ingredientType,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddIngredient((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleCheck = () => {
    setAddIngredient((prevValue) => ({
      ...prevValue,
      groceryExtra: !addIngredient.groceryExtra,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let foundIngredient;

    if (props.groceryListAdd) {
      foundIngredient = props.groceries.find(
        (ingredient) => ingredient.name.toUpperCase() === addIngredient.name.toUpperCase(),
      );
    } else {
      foundIngredient = props.pantry.find(
        (ingredient) => ingredient.name.toUpperCase() === addIngredient.name.toUpperCase(),
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

  let ingredientName;
  if (!addIngredient.groceryExtra) {
    ingredientName = (
      <Autocomplete
        id="ingredients"
        options={props.ingredients}
        onChange={handleAutocompleteName}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Ingredient Name"
            variant="outlined"
            id="name"
            name="name"
          />
        )}
      />
    );
  } else {
    ingredientName = (
      <TextField
        fullWidth
        onChange={handleChange}
        variant="outlined"
        required
        value={addIngredient.name}
        label="Ingredient Name"
        id="name"
        name="name"
      />
    );
  }

  return (
    <Card>
      <form noValidate>
        <div className={classes.paper}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <CardTitle title={`Add Ingredients To ${props.name}`} />
            </Grid>
            {props.groceryListAdd && (
              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    <Checkbox
                      checked={!addIngredient.groceryExtra}
                      onChange={handleCheck}
                      color="primary"
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography align="left">Track Item In Pantry</Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              {ingredientName}
            </Grid>
            <Grid item xs={5}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                required
                value={addIngredient.quantity}
                label="Quantity"
                id="quantity"
                name="quantity"
              />
            </Grid>
            <Grid item xs={7}>
              <Autocomplete
                id="ingredientQuantityTypes"
                value={addIngredient.quantityType}
                options={ingredientQuantityTypes}
                onChange={handleAutocompleteQuantityType}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Quantity Type"
                    variant="outlined"
                    id="quantityType"
                    name="quantityType"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
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
