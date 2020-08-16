import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

function IngredientDeleteDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Delete ingredient?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          This action cannot be reversed. Are you sure you want to delete this
          ingredient?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.delete} color='primary'>
          Delete
        </Button>
        <Button onClick={props.close} color='primary' autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default IngredientDeleteDialog;
