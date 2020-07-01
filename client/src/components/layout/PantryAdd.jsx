import React, {useEffect, useState} from 'react';
import {
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

  const [user, setUser] = useState({
    email: props.email,
    firstName: props.firstName,
    lastName: props.lastName,
  });
  const [addIngredient, setAddIngredient] = useState({
    name: '',
    quantity: '',
    quantityType: '',
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    setUser({
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
    });
  }, [props]);

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
      // If add request is successful, reset form back to empty
      setAddIngredient({
        name: '',
        quantity: '',
        quantityType: '',
      });

      // If add request is successful, clear old errors from state
      setError({
        errorMessage: '',
      });

      // Get updated pantry to re-render
      props.updatePantry();
    } else {
      setError({
        errorMessage: requestResponse.authResponsePayload,
      });
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={5}>
        <Typography>{props.name}</Typography>
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          onChange={handleChange}
          variant='outlined'
          required
          placeholder={addIngredient.quantity}
          value={addIngredient.quantity}
          id='quantity'
          name='quantity'
          autoComplete='quantity'
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl>
          <Select
            labelId='quantityType'
            id='quantityType'
            required
            placeholder={addIngredient.quantityType}
            value={addIngredient.quantityType}
            onChange={handleSelect}
          >
            {ingredientQuantityTypes.map((quantityType) => {
              return <MenuItem value={quantityType}>{quantityType}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        {!isEmpty(error.errorMessage) && (
          <FormSubmitMessage submitMessage={error.errorMessage} />
        )}
      </Grid>
    </Grid>
  );
}

export default PantryAdd;
