import React from 'react';
import Container from '@material-ui/core/Container';

import Copyright from './Copyright';
import useStylesMain from '../Styles';
import { themeMain } from '../Theme';

const Footer = () => {
  const classes = useStylesMain(themeMain);

  return (
    <footer className={classes.footer}>
      <Container maxWidth="xs">
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
