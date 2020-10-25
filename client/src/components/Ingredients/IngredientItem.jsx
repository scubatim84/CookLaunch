import React, { useEffect, useState } from 'react';
import { ingredientQuantityTypes } from '../../actions/types';
import { makeStyles } from '@material-ui/core/styles';
import { themeMain } from '../../Theme';
import {
  Checkbox,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Cancel, Edit, Delete, Done } from '@material-ui/icons';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';
import { convert_units } from '../../actions/unitConversions';
import IngredientText from './IngredientText';
import IngredientDeleteDialog from './IngredientDeleteDialog';

function IngredientItem(props) {
  const { id, name, quantity, quantityType, checked, groceryExtra } = props;

  const classes = useStyles(themeMain);

  const [editIngredient, setEditIngredient] = useState({
    id: id,
    name: name,
    quantity: quantity,
    quantityType: quantityType,
    checked: checked,
    groceryExtra: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateRequired, setUpdateRequired] = useState(false);
  const [groceryIngredient, setGroceryIngredient] = React.useState(false);
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    setEditIngredient({
      id: id,
      name: name,
      quantity: quantity,
      quantityType: quantityType,
      checked: checked,
      groceryExtra: groceryExtra,
    });

    setGroceryIngredient(props.groceryIngredient);
  }, [
    id,
    name,
    quantity,
    quantityType,
    checked,
    groceryExtra,
    props.groceryIngredient,
  ]);

  useEffect(() => {
    const updateCheckIngredient = async () => {
      const response = await props.handleUpdateIngredient(editIngredient);

      if (!isEmpty(response)) {
        setError({
          errorMessage: response,
        });
      }
    };

    if (updateRequired) {
      updateCheckIngredient();

      return function cleanup() {
        setUpdateRequired(false);
      };
    }
  }, [editIngredient, updateRequired, props]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const response = await props.handleDelete(id);

    if (!isEmpty(response)) {
      setError({
        errorMessage: response,
      });
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditIngredient((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleCheck = (event) => {
    const isChecked = event.target.checked;

    setEditIngredient((prevValue) => {
      return {
        ...prevValue,
        checked: isChecked,
      };
    });

    setUpdateRequired(true);
  };

  const handleSelect = (e) => {
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
        };
      });
    }
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

  if (editMode) {
    return (
      <Grid container alignItems='center'>
        <Grid item xs={4}>
          {editIngredient.groceryExtra ? (
            <TextField
              inputProps={{ 'data-testid': 'grocery-edit-name' }}
              onChange={handleChange}
              variant='outlined'
              required
              placeholder={editIngredient.name}
              value={editIngredient.name}
              id='name'
              name='name'
              autoComplete='name'
            />
          ) : (
            <IngredientText>{name}</IngredientText>
          )}
        </Grid>
        <Grid item xs={2}>
          <TextField
            inputProps={{ 'data-testid': 'grocery-edit-quantity' }}
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
        <Grid item xs={4}>
          <FormControl>
            <Select
              data-testid='select-quantity-type'
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
          <Done
            data-testid='done-icon'
            onClick={handleSubmit}
            className={classes.icon}
          />
        </Grid>
        <Grid item xs={1}>
          <Cancel
            data-testid='cancel-icon'
            onClick={handleCancel}
            className={classes.icon}
          />
        </Grid>
        <Grid item xs={12}>
          {!isEmpty(error.errorMessage) && (
            <FormSubmitMessage submitMessage={error.errorMessage} />
          )}
        </Grid>
      </Grid>
    );
  }

  if (groceryIngredient) {
    if (editIngredient.checked) {
      return (
        <Grid container alignItems='center'>
          <Grid item xs={2}>
            <Checkbox
              data-testid='grocery-checkbox-checked'
              checked={editIngredient.checked}
              onChange={handleCheck}
              color='primary'
            />
          </Grid>
          <Grid item xs={3}>
            <IngredientText checked={true}>{name}</IngredientText>
          </Grid>
          <Grid item xs={2}>
            <IngredientText checked={true}>{quantity}</IngredientText>
          </Grid>
          <Grid item xs={3}>
            <IngredientText checked={true}>{quantityType}</IngredientText>
          </Grid>
          <Grid item xs={1}>
            <Edit
              data-testid='edit-icon'
              onClick={handleEdit}
              className={classes.icon}
            />
          </Grid>
          <Grid item xs={1}>
            <Delete
              data-testid='delete-icon'
              onClick={handleClickOpen}
              className={classes.icon}
            />
            <IngredientDeleteDialog
              open={open}
              close={handleClose}
              delete={handleDelete}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container alignItems='center'>
          <Grid item xs={2}>
            <Checkbox
              data-testid='grocery-checkbox-unchecked'
              checked={editIngredient.checked}
              onChange={handleCheck}
              color='primary'
            />
          </Grid>
          <Grid item xs={3}>
            <IngredientText>{name}</IngredientText>
          </Grid>
          <Grid item xs={2}>
            <IngredientText>{quantity}</IngredientText>
          </Grid>
          <Grid item xs={3}>
            <IngredientText>{quantityType}</IngredientText>
          </Grid>
          <Grid item xs={1}>
            <Edit
              data-testid='edit-icon'
              onClick={handleEdit}
              className={classes.icon}
            />
          </Grid>
          <Grid item xs={1}>
            <Delete
              data-testid='delete-icon'
              onClick={handleClickOpen}
              className={classes.icon}
            />
            <IngredientDeleteDialog
              open={open}
              close={handleClose}
              delete={handleDelete}
            />
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <Grid container spacing={1} alignItems='center'>
      <Grid item xs={5}>
        <IngredientText>{name}</IngredientText>
      </Grid>
      <Grid item xs={2}>
        <IngredientText>{quantity}</IngredientText>
      </Grid>
      <Grid item xs={3}>
        <IngredientText>{quantityType}</IngredientText>
      </Grid>
      <Grid item xs={1}>
        <Edit
          data-testid='edit-icon'
          onClick={handleEdit}
          className={classes.icon}
        />
      </Grid>
      <Grid item xs={1}>
        <Delete
          data-testid='delete-icon'
          onClick={handleClickOpen}
          className={classes.icon}
        />
        <IngredientDeleteDialog
          open={open}
          close={handleClose}
          delete={handleDelete}
        />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  strikethrough: {
    textDecoration: 'line-through',
  },
}));

export default IngredientItem;
