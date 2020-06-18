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

function DashboardNavBar() {

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

export default DashboardNavBar;
