import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';

import { themeMain } from '../Theme';
import ConfirmDialog from './ConfirmDialog';

const useStyles = makeStyles((theme) => ({
  icon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const DeleteButton = (props) => {
  const classes = useStyles(themeMain);

  const { id } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    props.handleDelete(id);
  };

  return (
    <div>
      <Delete
        data-testid="delete-icon"
        onClick={handleOpen}
        className={classes.icon}
      />
      <ConfirmDialog
        dialog={props.dialog}
        open={open}
        close={handleClose}
        delete={handleDelete}
      />
    </div>
  );
};

export default DeleteButton;
