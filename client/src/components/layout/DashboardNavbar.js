import React from 'react';
import { logoutUser } from "../../actions/authActions";
import { REQUEST_SUCCESS } from "../../actions/types";

import { AppBar, Button, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
    }
  }
});

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
	},
}));

function DashboardNavBar(props) {
	const classes = useStyles();

	const handleLogoutClick = async () => {
    const response = await logoutUser();

    if (response === REQUEST_SUCCESS) {
      props.changeLoggedIn(false);
    }
	};

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <span className="navbar-brand">Cook Launch</span>
						<Button
							onClick={handleLogoutClick}
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Logout
						</Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default DashboardNavBar;
