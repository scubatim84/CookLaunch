import React, { useEffect, useState } from 'react';
import isEmpty from 'is-empty';
import { Cancel, Delete, Done, Edit } from '@material-ui/icons';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core';

import FormSubmitMessage from '../FormSubmitMessage';
import { updateIngredient } from '../../actions/ingredientActions';

const IngredientNameItem = (props) => {
  const [editIngredient, setEditIngredient] = useState({
    id: props.id,
    name: props.name,
  });
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    setEditIngredient({
      id: props.id,
      name: props.name,
    });
  }, [props]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await props.handleDelete(props.id);
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
          <ListItemText primary={props.name} />
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
              <Delete
                data-testid='delete-icon'
                onClick={handleClickOpen}
                className='icon'
              />
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  {'Delete ingredient?'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    This action cannot be reversed. Are you sure you want to
                    delete this ingredient?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDelete} color='primary'>
                    Delete
                  </Button>
                  <Button onClick={handleClose} color='primary' autoFocus>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default IngredientNameItem;
