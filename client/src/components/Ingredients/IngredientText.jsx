import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  strikethrough: {
    textDecoration: 'line-through',
  },
}));

const IngredientText = (props) => {
  const classes = useStyles();

  if (props.checked) {
    return (
      <Typography
        data-testid={`checked-${props.children}`}
        id="Checked"
        align="left"
        style={{ overflowWrap: 'break-word' }}
        className={classes.strikethrough}
      >
        {props.children}
      </Typography>
    );
  }

  return (
    <Typography
      data-testid={`unchecked-${props.children}`}
      id="Unchecked"
      align="left"
      style={{ overflowWrap: 'break-word' }}
    >
      {props.children}
    </Typography>
  );
};

export default IngredientText;
