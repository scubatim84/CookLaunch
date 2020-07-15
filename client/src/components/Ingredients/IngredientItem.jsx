import React, {useEffect, useState} from 'react';
import {ingredientQuantityTypes} from '../../actions/types';
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
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';

function IngredientItem(props) {
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
    const response = await props.handleDelete(props.id);

    if (!isEmpty(response)) {
      setError({
        errorMessage: response,
      });
    }
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

    const response = await props.handleUpdateIngredient(editIngredient);

    if (!isEmpty(response)) {
      setError({
        errorMessage: response,
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
          placeholder={editIngredient.quantity.toString()}
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

export default IngredientItem;
