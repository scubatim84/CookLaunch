import React, { useEffect, useState } from 'react';
import isEmpty from 'is-empty';

import { convert_units } from '../../actions/unitConversions';
import IngredientItemEdit from './IngredientItemEdit';
import IngredientItemGrocery from './IngredientItemGrocery';
import IngredientItemView from './IngredientItemView';

const IngredientItem = (props) => {
  const { id, name, quantity, quantityType, checked, groceryExtra } = props;

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
  const [groceryIngredient, setGroceryIngredient] = useState(false);
  const [error, setError] = useState({
    message: '',
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
          message: response,
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

  const handleDelete = async () => {
    const response = await props.handleDelete(id);

    if (!isEmpty(response)) {
      setError({
        message: response,
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
        message: response,
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
      <IngredientItemGrocery
        editIngredient={editIngredient}
        handleCheck={handleCheck}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        name={name}
        quantity={quantity}
        quantityType={quantityType}
        ingredientDialog={ingredientDialog}
      />
    );
  }

  return (
    <IngredientItemView
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      name={name}
      quantity={quantity}
      quantityType={quantityType}
      ingredientDialog={ingredientDialog}
    />
  );
};

export default IngredientItem;
