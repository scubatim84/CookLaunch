import React, {useEffect, useState} from 'react';
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {ingredientQuantityTypes, REQUEST_SUCCESS} from '../../actions/types';
import {addIngredientToPantry} from '../../actions/pantryActions';
import isEmpty from 'is-empty';
import FormSubmitMessage from './FormSubmitMessage';

function PantryAdd(props) {
  const classes = useStylesForm(themeMain);

  const [addIngredient, setAddIngredient] = useState({
    name: '',
    quantity: '',
    quantityType: '',
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setAddIngredient((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSelect = async (e) => {
    const value = e.target.value;

    setAddIngredient((prevValue) => {
      return {
        ...prevValue,
        quantityType: value,
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
        errorMessage: requestResponse.authResponsePayload.message,
      });
    }
  };

  return (
    <form noValidate>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} align='center'>
          <Typography component='h1' variant='h5'>
            Add Ingredients To Pantry
          </Typography>
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            onChange={handleChange}
            variant='outlined'
            required
            placeholder='name'
            value={addIngredient.name}
            id='name'
            name='name'
            autoComplete='name'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleChange}
            variant='outlined'
            required
            placeholder='quantity'
            value={addIngredient.quantity}
            id='quantity'
            name='quantity'
            autoComplete='quantity'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl className={classes.submit}>
            <Select
              labelId='quantityType'
              id='quantityType'
              required
              placeholder='quantityType'
              value={addIngredient.quantityType}
              onChange={handleSelect}
            >
              {ingredientQuantityTypes.map((quantityType) => {
                return <MenuItem value={quantityType}>{quantityType}</MenuItem>;
              })}
            </Select>
          </FormControl>
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
  );
}

export default PantryAdd;
