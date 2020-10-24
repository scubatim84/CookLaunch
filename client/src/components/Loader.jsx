import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

import { useStylesMain } from '../Styles';
import { themeMain } from '../Theme';

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
