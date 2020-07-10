import React from 'react';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';
import {useStylesFooter} from '../Styles';

function Footer() {
  const classes = useStylesFooter();

  return (
    <footer className={classes.footer}>
      <Container maxWidth='xs'>
        <Copyright />
      </Container>
    </footer>
  );
}

export default Footer;
