import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Cancel, Delete, Done, Edit,
} from '@material-ui/icons';
import isEmpty from 'is-empty';
import { ingredientQuantityTypes } from '../../actions/types';
import convertUnits from '../../actions/unitConversions';
import FormSubmitMessage from '../FormSubmitMessage';

function RecipeIngredientView(props) {
  let { name } = props;

  const {
    _id,
    quantity,
    quantityType,
    quantityHave,
    quantityNeeded,
    handleUpdateIngredient,
    handleDeleteIngredient,
  } = props;

  const [editIngredient, setEditIngredient] = useState({
    _id,
    name,
    quantity,
    quantityType,
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    setEditIngredient({
      _id,
      name,
      quantity,
      quantityType,
    });
  }, [_id, name, quantity, quantityType]);

  const handleDelete = async () => {
    await handleDeleteIngredient(_id);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    name = e.target.name;
    const { value } = e.target;

    setEditIngredient((prevValue) => ({
      ...prevValue,
      [name]: value,
      dateLastChanged: new Date(),
    }));
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    const oldValue = editIngredient.quantityType;

    const newQuantity = convertUnits(editIngredient.quantity, oldValue, value);

    if (Number.isNaN(newQuantity)) {
      setError({
        errorMessage: `You cannot convert ${oldValue} to ${value}.`,
      });
    } else {
      setEditIngredient((prevValue) => ({
        ...prevValue,
        quantity: newQuantity,
        quantityType: value,
        dateLastChanged: new Date(),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleUpdateIngredient(editIngredient);
  };

  if (props.editMode) {
    if (editMode) {
      return (
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={4} sm={5}>
            <Typography>{name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              onChange={handleChange}
              variant="outlined"
              required
              placeholder={editIngredient.quantity.toString()}
              value={editIngredient.quantity}
              id="quantity"
              name="quantity"
              autoComplete="quantity"
            />
          </Grid>
          <Grid item xs={2} sm={3}>
            <FormControl>
              <Select
                labelId="quantityType"
                id="quantityType"
                required
                placeholder={editIngredient.quantityType}
                value={editIngredient.quantityType}
                onChange={handleSelect}
              >
                {ingredientQuantityTypes.map((type) => (
                  <MenuItem key={new Date() + type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Done onClick={handleSubmit} className="icon" />
          </Grid>
          <Grid item xs={2} sm={1}>
            <Cancel onClick={handleCancel} className="icon" />
          </Grid>
          <Grid item xs={12}>
            {!isEmpty(error.errorMessage) && (
              <FormSubmitMessage submitMessage={error.errorMessage} />
            )}
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid container alignItems="center">
        <Grid item xs={4} sm={5}>
          <Typography>{name}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>{quantity}</Typography>
        </Grid>
        <Grid item xs={2} sm={3}>
          <Typography>{quantityType}</Typography>
        </Grid>
        <Grid item xs={2} sm={1}>
          <Edit onClick={handleEdit} className="icon" />
        </Grid>
        <Grid item xs={2} sm={1}>
          <Delete onClick={handleDelete} className="icon" />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container alignItems="center">
      <Grid item xs={4} sm={5}>
        <Typography>{name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{quantity}</Typography>
      </Grid>
      <Grid item xs={2} sm={3}>
        <Typography>{quantityType}</Typography>
      </Grid>
      <Grid item xs={2} sm={1}>
        <Typography>{quantityHave}</Typography>
      </Grid>
      <Grid item xs={2} sm={1}>
        <Typography>{quantityNeeded}</Typography>
      </Grid>
    </Grid>
  );
}

export default RecipeIngredientView;
