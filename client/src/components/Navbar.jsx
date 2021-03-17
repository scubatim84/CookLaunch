import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  AppBar,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { logoutUser } from '../actions/authActions';
import { REQUEST_SUCCESS } from '../actions/types';
import Brand from './Brand';
import { themeNavbar } from '../Theme';

function NavBar(props) {
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

  const handleLogout = async () => {
    const response = await logoutUser();

    if (response === REQUEST_SUCCESS) {
      props.handleLoggedIn(false);
    }

    handleClose();
  };

  return (
    <ThemeProvider theme={themeNavbar}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              {isLoggedIn ? (
                <Grid container justify="space-between">
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
                      <Link
                        href="/recipes/add"
                        color="textPrimary"
                        style={{ textDecoration: 'none' }}
                      >
                        <MenuItem>Add New Recipe</MenuItem>
                      </Link>
                      <Link
                        href="/ingredients"
                        color="textPrimary"
                        style={{ textDecoration: 'none' }}
                      >
                        <MenuItem>Ingredients</MenuItem>
                      </Link>
                      <Link
                        href="/profile"
                        color="textPrimary"
                        style={{ textDecoration: 'none' }}
                      >
                        <MenuItem>Profile</MenuItem>
                      </Link>
                      <Link
                        href="/dashboard/pantry"
                        color="textPrimary"
                        style={{ textDecoration: 'none' }}
                      >
                        <MenuItem>Pantry</MenuItem>
                      </Link>
                      <Link
                        href="/dashboard/groceries"
                        color="textPrimary"
                        style={{ textDecoration: 'none' }}
                      >
                        <MenuItem>Grocery List</MenuItem>
                      </Link>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              ) : (
                <Grid container justify="space-between">
                  <Grid item>
                    <Brand />
                  </Grid>
                </Grid>
              )}
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default NavBar;
