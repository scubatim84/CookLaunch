import React from 'react';
import {useStylesMain} from '../Styles';
import {themeMain} from '../Theme';
import {Backdrop, CircularProgress} from '@material-ui/core';

function Loader() {
  const classes = useStylesMain(themeMain);

  return (
    <div className={classes.minHeight}>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
}

export default Loader;
