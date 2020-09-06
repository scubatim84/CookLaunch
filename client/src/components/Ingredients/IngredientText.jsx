import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

function IngredientText(props) {
  const classes = useStyles();

  if (props.checked) {
    return (
      <Typography
        id='Checked'
        align='left'
        style={{overflowWrap: 'break-word'}}
        className={classes.strikethrough}
      >
        {props.children}
      </Typography>
    );
  } else {
    return (
      <Typography
        id='Unchecked'
        align='left'
        style={{overflowWrap: 'break-word'}}
      >
        {props.children}
      </Typography>
    );
  }
}

const useStyles = makeStyles(() => ({
  strikethrough: {
    textDecoration: 'line-through',
  },
}));

export default IngredientText;
