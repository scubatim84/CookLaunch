import {createMuiTheme} from '@material-ui/core/styles';

export const themeMain = createMuiTheme({
  palette: {
    primary: {
      dark: '#003d00',
      main: '#33691e',
      light: '#629749',
    },
    text: {
      primary: '#003d00',
    },
  },
  typography: {
    fontFamily: 'Helvetica',
    h5: {
      fontFamily: 'Roboto',
    },
    subtitle1: {
      fontFamily: 'Roboto',
      fontSize: 18,
      fontWeight: 500,
    },
  },
});

export const themeNavbar = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    text: {
      primary: '#003d00',
    },
  },
  typography: {
    fontFamily: 'Cambria',
  },
});
