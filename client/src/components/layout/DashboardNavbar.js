import React, { useState } from 'react';
import { logoutUser } from "../../actions/authActions";
import { REQUEST_SUCCESS } from "../../actions/types";

import { AppBar, Grid, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
	menuButton: {
    marginRight: theme.spacing(5),
	},
	submit: {
    margin: theme.spacing(3, 0, 2),
	},
  title: {
    flexGrow: 1,
  },
}));

function DashboardNavBar(props) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

	const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
    setAnchorEl(null);
  };

	const handleLogoutClick = async () => {
    const response = await logoutUser();

    if (response === REQUEST_SUCCESS) {
      props.changeLoggedIn(false);
		}
		
		handleClose();
	};

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
						<Grid
							justify="space-between" // Add it here :)
							container 
							spacing={24}
						>
							<Grid item>
								<span className="navbar-brand">Cook Launch</span>
							</Grid>
							<Grid item>
								<IconButton
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={handleMenu}
										color="inherit"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={open}
									onClose={handleClose}
								>
									<MenuItem onCLick={handleClose}>Profile</MenuItem>
									<MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
								</Menu>
							</Grid>
						</Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default DashboardNavBar;