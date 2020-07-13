import React from 'react';
import Copyright from './Copyright';
import {useStylesMain} from '../Styles';
import {themeMain} from '../Theme';
import Container from '@material-ui/core/Container';

function Footer() {
  const classes = useStylesMain(themeMain);

  return (
    <footer className={classes.footer}>
      <Container maxWidth='xs'>
        <Copyright />
      </Container>
    </footer>
  );
}

export default Footer;
