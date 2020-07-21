import React, {useEffect, useState} from 'react';
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
import {ingredientQuantityTypes} from '../../actions/types';
import {Cancel, Delete, Done, Edit} from '@material-ui/icons';

function RecipeIngredientView(props) {
  const classes = useStylesForm(themeMain);

  const [editIngredient, setEditIngredient] = useState({
    _id: props._id,
    name: props.name,
    quantity: props.quantity,
    quantityType: props.quantityType,
  });
  const [editMode, setEditMode] = useState(false);

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

    setEditIngredient((prevValue) => {
      return {
        ...prevValue,
        quantityType: value,
        dateLastChanged: new Date(),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await props.handleUpdateIngredient(editIngredient);
  };

  if (props.editMode) {
    if (editMode) {
      return (
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
        </Grid>
      );
    } else {
      return (
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
  } else {
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={8}>
          <Typography>{props.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={1}>
          <Typography>{props.quantity}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography>{props.quantityType}</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default RecipeIngredientView;
