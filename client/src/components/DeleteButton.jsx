import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';

import { themeMain } from '../Theme';
import ConfirmDialog from './ConfirmDialog';

const DeleteButton = (props) => {
  const classes = useStyles(themeMain);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Delete
        data-testid='delete-icon'
        onClick={handleOpen}
        className={classes.icon}
      />
      <ConfirmDialog
        dialog={props.dialog}
        open={open}
        close={handleClose}
        delete={props.handleDelete}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  icon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

export default DeleteButton;
