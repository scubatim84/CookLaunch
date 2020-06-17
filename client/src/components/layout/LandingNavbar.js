import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
    }
  }
});

function LandingNavBar() {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar className="landing-navbar" position="static">
          <Toolbar>
            <span className="navbar-brand">Cook Launch</span>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default LandingNavBar;
