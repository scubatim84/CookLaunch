import React, {useEffect, useState} from 'react';
import {Grid, ListItem, ListItemText, TextField} from '@material-ui/core';
import {Cancel, Delete, Done, Edit} from '@material-ui/icons';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';
import {REQUEST_SUCCESS} from '../../actions/types';
import {updateIngredient} from '../../actions/ingredientActions';

function IngredientNameItem(props) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestResponse = await updateIngredient(editIngredient);

    if (requestResponse.authResponseType === REQUEST_SUCCESS) {
      // If updating ingredient is successful, re-render ingredient list
      await props.getIngredientData();
    } else {
      setError({
        errorMessage: requestResponse.authResponsePayload,
      });
    }
  };

  if (editMode) {
    return (
      <Grid container>
        <Grid item xs={9}>
          <TextField
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
      <Grid container>
        <Grid item xs={9}>
          <ListItem dense={true} alignItems='flex-start'>
            <ListItemText primary={props.name} />
          </ListItem>
        </Grid>
        {props.userId === props.createdBy && (
          <Grid item xs={2}>
            <Grid container>
              <Grid item xs={6}>
                <Edit onClick={handleEdit} className='icon' />
              </Grid>
              <Grid item xs={6}>
                <Delete onClick={handleDelete} className='icon' />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default IngredientNameItem;
