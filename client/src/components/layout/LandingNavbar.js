import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
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
        <AppBar position="static">
          <Toolbar>
            <span className="navbar-brand">Cook Launch</span>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default LandingNavBar;
