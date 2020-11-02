import React, { useEffect, useState } from 'react';
import isEmpty from 'is-empty';
import { Cancel, Done, Edit } from '@material-ui/icons';
import { Grid, ListItem, ListItemText, TextField } from '@material-ui/core';

import { updateIngredient } from '../../actions/ingredientActions';
import FormSubmitMessage from '../FormSubmitMessage';
import DeleteButton from '../DeleteButton';

const IngredientNameItem = (props) => {
  const [editIngredient, setEditIngredient] = useState({
    id: props.id,
    name: props.name,
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    setEditIngredient({
      id: props.id,
      name: props.name,
    });
  }, [props.id, props.name]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await updateIngredient(editIngredient);

    if (response.status === 204) {
      // If updating ingredient is successful, re-render ingredient list
      await props.getIngredientData();
    } else {
      setError({
        errorMessage: response.data,
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
      <Grid container alignItems='center'>
        <Grid item xs={10}>
          <TextField
            inputProps={{ 'data-testid': 'ingredient-name-edit' }}
            onChange={handleChange}
            variant='outlined'
            required
            placeholder={editIngredient.name}
            value={editIngredient.name}
            id='name'
            name='name'
          />
        </Grid>
        <Grid item xs={1}>
          <Done
            data-testid='done-icon'
            onClick={handleSubmit}
            className='icon'
          />
        </Grid>
        <Grid item xs={1}>
          <Cancel
            data-testid='cancel-icon'
            onClick={handleCancel}
            className='icon'
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

  return (
    <Grid container alignItems='center'>
      <Grid item xs={10}>
        <ListItem dense={true} alignItems='flex-start'>
          <ListItemText
            data-testid={`list-item-${props.name}`}
            primary={props.name}
          />
        </ListItem>
      </Grid>
      {props.userId === props.createdBy && (
        <Grid item xs={2}>
          <Grid container>
            <Grid item xs={6}>
              <Edit
                data-testid='edit-icon'
                onClick={handleEdit}
                className='icon'
              />
            </Grid>
            <Grid item xs={6}>
              <DeleteButton
                dialog={ingredientDialog}
                handleDelete={props.handleDelete}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default IngredientNameItem;
