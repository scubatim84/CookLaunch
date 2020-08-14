import React, {useEffect, useState} from 'react';
import {ingredientQuantityTypes} from '../../actions/types';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import {convert_units} from '../../actions/unitConversions';

function IngredientItem(props) {
  const [editIngredient, setEditIngredient] = useState({
    id: props.id,
    name: props.name,
    quantity: props.quantity,
    quantityType: props.quantityType,
    checked: props.checked,
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
      id: props.id,
      name: props.name,
      quantity: props.quantity,
      quantityType: props.quantityType,
      checked: props.checked,
      groceryExtra: props.groceryExtra,
    });

    setGroceryIngredient(props.groceryIngredient);
  }, [props]);

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
    const response = await props.handleDelete(props.id);

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
    const {name, value} = e.target;

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
        <Grid item xs={5}>
          <Typography align='left'>{props.name}</Typography>
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
  }

  if (groceryIngredient) {
    if (editIngredient.checked) {
      return (
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={2}>
            <Checkbox
              checked={editIngredient.checked}
              onChange={handleCheck}
              color='primary'
            />
          </Grid>
          <Grid item xs={4}>
            <Typography component={'span'} align='left'>
              <div className='strikethrough'>{props.name}</div>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography component={'span'} align='left'>
              <div className='strikethrough'>{props.quantity}</div>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography component={'span'} align='left'>
              <div className='strikethrough'>{props.quantityType}</div>
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Edit onClick={handleEdit} className='icon' />
          </Grid>
          <Grid item xs={1}>
            <Delete onClick={handleClickOpen} className='icon' />
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
      );
    } else {
      return (
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={2}>
            <Checkbox
              checked={editIngredient.checked}
              onChange={handleCheck}
              color='primary'
            />
          </Grid>
          <Grid item xs={4}>
            <Typography align='left'>{props.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography align='left'>{props.quantity}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography align='left'>{props.quantityType}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Edit onClick={handleEdit} className='icon' />
          </Grid>
          <Grid item xs={1}>
            <Delete onClick={handleClickOpen} className='icon' />
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
      );
    }
  }

  return (
    <Grid container spacing={1} alignItems='center'>
      <Grid item xs={6}>
        <Typography align='left'>{props.name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align='left'>{props.quantity}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align='left'>{props.quantityType}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Edit onClick={handleEdit} className='icon' />
      </Grid>
      <Grid item xs={1}>
        <Delete onClick={handleClickOpen} className='icon' />
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
              This action cannot be reversed. Are you sure you want to delete
              this ingredient?
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
  );
}

export default IngredientItem;
