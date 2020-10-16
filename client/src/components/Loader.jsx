import React from 'react';
import { useStylesMain } from '../Styles';
import { themeMain } from '../Theme';
import { Backdrop, CircularProgress } from '@material-ui/core';

const Loader = (props) => {
  const classes = useStylesMain(themeMain);

  return (
    <div className={classes.minHeight}>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress {...props} color='inherit' />
      </Backdrop>
    </div>
  );
};

export default Loader;
