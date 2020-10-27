import React, { useEffect, useState } from 'react';
import isEmpty from 'is-empty';
import { makeStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import { Checkbox, Grid } from '@material-ui/core';

import { themeMain } from '../../Theme';
import { convert_units } from '../../actions/unitConversions';
import IngredientItemEdit from './IngredientItemEdit';
import IngredientText from './IngredientText';
import DeleteButton from '../DeleteButton';

const IngredientItem = (props) => {
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
  }, [id, name, quantity, quantityType, checked, groceryExtra]);

  useEffect(() => {
    setGroceryIngredient(props.groceryIngredient);
  }, [props.groceryIngredient]);

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
  }, [editIngredient, updateRequired, props.handleUpdateIngredient]);

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

    setEditIngredient((prevValue) => {
      return {
        ...prevValue,
        quantity: newQuantity,
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

  const ingredientDialog = {
    title: 'Delete ingredient?',
    text:
      'This action cannot be reversed. Are you sure you want to delete this ingredient?',
    leftButtonLabel: 'Delete',
    rightButtonLabel: 'Cancel',
  };

  if (editMode) {
    return (
      <IngredientItemEdit
        editIngredient={editIngredient}
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        error={error}
        name={name}
      />
    );
  }

  if (groceryIngredient) {
    return (
      <Grid container alignItems='center'>
        <Grid item xs={2}>
          <Checkbox
            data-testid={
              editIngredient.checked
                ? 'grocery-checkbox-checked'
                : 'grocery-checkbox-unchecked'
            }
            checked={editIngredient.checked}
            onChange={handleCheck}
            color='primary'
          />
        </Grid>
        <Grid item xs={3}>
          <IngredientText checked={editIngredient.checked}>
            {name}
          </IngredientText>
        </Grid>
        <Grid item xs={2}>
          <IngredientText checked={editIngredient.checked}>
            {quantity}
          </IngredientText>
        </Grid>
        <Grid item xs={3}>
          <IngredientText checked={editIngredient.checked}>
            {quantityType}
          </IngredientText>
        </Grid>
        <Grid item xs={1}>
          <Edit
            data-testid='edit-icon'
            onClick={handleEdit}
            className={classes.icon}
          />
        </Grid>
        <Grid item xs={1}>
          <DeleteButton dialog={ingredientDialog} handleDelete={handleDelete} />
        </Grid>
      </Grid>
    );
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
        <DeleteButton dialog={ingredientDialog} handleDelete={handleDelete} />
      </Grid>
    </Grid>
  );
};

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
