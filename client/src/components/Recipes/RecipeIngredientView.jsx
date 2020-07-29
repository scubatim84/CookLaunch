import React, {useEffect, useState} from 'react';
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {ingredientQuantityTypes} from '../../actions/types';
import {Cancel, Delete, Done, Edit} from '@material-ui/icons';
import {convert_units} from '../../actions/unitConversions';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';

function RecipeIngredientView(props) {
  const [editIngredient, setEditIngredient] = useState({
    _id: props._id,
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
      _id: props._id,
      name: props.name,
      quantity: props.quantity,
      quantityType: props.quantityType,
    });
  }, [props]);

  const handleDelete = async () => {
    await props.handleDeleteIngredient(props._id);
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
        dateLastChanged: new Date(),
      };
    });
  };

  const handleSelect = async (e) => {
    const value = e.target.value;
    const oldValue = editIngredient.quantityType;

    const newQuantity = convert_units(editIngredient.quantity, oldValue, value);

    if (isNaN(newQuantity)) {
      setError({
        errorMessage: `You cannot convert ${oldValue} to ${value}.`,
      });
    } else {
      setEditIngredient((prevValue) => {
        return {
          ...prevValue,
          quantity: newQuantity,
          quantityType: value,
          dateLastChanged: new Date(),
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await props.handleUpdateIngredient(editIngredient);
  };

  if (props.editMode) {
    if (editMode) {
      return (
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={5}>
            <Typography>{props.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              onChange={handleChange}
              variant='outlined'
              required
              placeholder={editIngredient.quantity.toString()}
              value={editIngredient.quantity}
              id='quantity'
              name='quantity'
              autoComplete='quantity'
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <Select
                labelId='quantityType'
                id='quantityType'
                required
                placeholder={editIngredient.quantityType}
                value={editIngredient.quantityType}
                onChange={handleSelect}
              >
                {ingredientQuantityTypes.map((quantityType, index) => {
                  return (
                    <MenuItem key={index} value={quantityType}>
                      {quantityType}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <Done onClick={handleSubmit} className='icon' />
          </Grid>
          <Grid item xs={1}>
            <Cancel onClick={handleCancel} className='icon' />
          </Grid>
          <Grid item xs={12}>
            {!isEmpty(error.errorMessage) && (
              <FormSubmitMessage submitMessage={error.errorMessage} />
            )}
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container alignItems='center'>
          <Grid item xs={6}>
            <Typography>{props.name}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>{props.quantity}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{props.quantityType}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Edit onClick={handleEdit} className='icon' />
          </Grid>
          <Grid item xs={1}>
            <Delete onClick={handleDelete} className='icon' />
          </Grid>
        </Grid>
      );
    }
  } else {
    return (
      <Grid container alignItems='center'>
        <Grid item xs={6}>
          <Typography>{props.name}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>{props.quantity}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{props.quantityType}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>{props.quantityHave}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>{props.quantityNeeded}</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default RecipeIngredientView;
