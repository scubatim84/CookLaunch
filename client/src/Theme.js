import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f0f2f5',
    },
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
  },
});

export default theme;
