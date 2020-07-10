import React, {useEffect, useState} from 'react';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';
import {ingredientQuantityTypes, REQUEST_SUCCESS} from '../../actions/types';
import {updateIngredientInPantry} from '../../actions/pantryActions';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {Cancel, Edit, Delete, Done} from '@material-ui/icons';

function PantryItem(props) {
  const classes = useStylesForm(themeMain);

  const [editIngredient, setEditIngredient] = useState({
    id: props.id,
    name: props.name,
    quantity: props.quantity,
    quantityType: props.quantityType,
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    setEditIngredient({
      id: props.id,
      name: props.name,
      quantity: props.quantity,
      quantityType: props.quantityType,
    });
  }, [props]);

  const handleDelete = async () => {
    await props.handleDelete(props.id);
  };

  const handleEdit = async () => {
    await setEditMode(true);
  };

  const handleCancel = async () => {
    await setEditMode(false);
  };

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setEditIngredient((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSelect = async (e) => {
    const value = e.target.value;

    setEditIngredient((prevValue) => {
      return {
        ...prevValue,
        quantityType: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestResponse = await updateIngredientInPantry(editIngredient);

    if (requestResponse.authResponseType === REQUEST_SUCCESS) {
      // If edit request is successful, set ingredient data back to props
      setEditIngredient({
        id: props.id,
        name: props.name,
        quantity: props.quantity,
        quantityType: props.quantityType,
      });

      // If edit request is successful, clear old errors from state
      setError({
        errorMessage: '',
      });

      // If edit request is successful, set edit mode back to false
      setEditMode(false);
      // Update user payload to re-render pantry
      await props.getUserPayload();
    } else {
      setError({
        errorMessage: requestResponse.authResponsePayload,
      });
    }
  };

  return editMode ? (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} sm={5}>
        <Typography>{props.name}</Typography>
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          onChange={handleChange}
          variant='outlined'
          required
          placeholder={editIngredient.quantity}
          value={editIngredient.quantity}
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
            placeholder={editIngredient.quantityType}
            value={editIngredient.quantityType}
            onChange={handleSelect}
          >
            {ingredientQuantityTypes.map((quantityType) => {
              return <MenuItem value={quantityType}>{quantityType}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Done onClick={handleSubmit} className='icon' />
      </Grid>
      <Grid item xs={12} sm={1}>
        <Cancel onClick={handleCancel} className='icon' />
      </Grid>
      <Grid item xs={12}>
        {!isEmpty(error.errorMessage) && (
          <FormSubmitMessage submitMessage={error.errorMessage} />
        )}
      </Grid>
    </Grid>
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Typography>{props.name}</Typography>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Typography>{props.quantity}</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography>{props.quantityType}</Typography>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Edit onClick={handleEdit} className='icon' />
      </Grid>
      <Grid item xs={12} sm={1}>
        <Delete onClick={handleDelete} className='icon' />
      </Grid>
    </Grid>
  );
}

export default PantryItem;
