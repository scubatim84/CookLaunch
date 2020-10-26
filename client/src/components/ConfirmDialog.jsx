import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const ConfirmDialog = (props) => {
  const [dialog, setDialog] = useState({
    title: '',
    text: '',
    leftButtonLabel: '',
    rightButtonLabel: '',
  });

  useEffect(() => {
    if (props.dialog) {
      setDialog({
        title: props.dialog.title,
        text: props.dialog.text,
        leftButtonLabel: props.dialog.leftButtonLabel,
        rightButtonLabel: props.dialog.rightButtonLabel,
      });
    }
  }, [props.dialog]);

  return (
    <Dialog
      data-testid='confirm-dialog'
      open={props.open}
      onClose={props.close}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle data-testid='confirm-dialog-title' id='alert-dialog-title'>
        {dialog.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          data-testid='confirm-dialog-text'
          id='alert-dialog-description'
        >
          {dialog.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          data-testid='confirm-dialog-button-left'
          onClick={props.delete}
          color='primary'
        >
          {dialog.leftButtonLabel}
        </Button>
        <Button
          data-testid='confirm-dialog-button-right'
          onClick={props.close}
          color='primary'
          autoFocus
        >
          {dialog.rightButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
