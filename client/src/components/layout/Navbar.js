import React, { useState, useEffect } from 'react';
import { logoutUser } from "../../actions/authActions";
import { REQUEST_SUCCESS } from "../../actions/types";

import { AppBar, Grid, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Brand from './Brand';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
		},
		text: {
			primary: '#003d00',
		},
	},
	typography: {
		fontFamily: 'Cambria',
	},
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

function NavBar(props) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);
	const open = Boolean(anchorEl);
	
	useEffect(() => {
    setIsLoggedIn(props.isLoggedIn);
	}, [props.isLoggedIn]);

	const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
    setAnchorEl(null);
  };

	const handleLogoutClick = async () => {
    const response = await logoutUser();

    if (response === REQUEST_SUCCESS) {
      props.handleLoggedIn(false);
		}
		
		handleClose();
	};

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
						{isLoggedIn ? 
							(<Grid
								justify="space-between"
								container 
								spacing={10}
							>
								<Grid item>
									<Brand />
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
										<MenuItem onClick={handleClose}>Profile</MenuItem>
										<MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
									</Menu>
								</Grid>
							</Grid>)
							: 
							(<Grid
								justify="space-between"
								container 
								spacing={10}
							>
								<Grid item>
									<Brand />
								</Grid>
                <Grid item>
								</Grid>
							</Grid>)}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default NavBar;