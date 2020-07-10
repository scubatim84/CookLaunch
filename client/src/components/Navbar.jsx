import React, {useEffect, useState} from 'react';
import {logoutUser} from '../actions/authActions';
import {REQUEST_SUCCESS} from '../actions/types';
import {themeNavbar} from '../Theme';
import {useStylesNavbar} from '../Styles';

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
import {ThemeProvider} from '@material-ui/core/styles';

import Brand from './Brand';

function NavBar(props) {
  const classes = useStylesNavbar(themeNavbar);
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
    <div className={classes.root}>
      <ThemeProvider theme={themeNavbar}>
        <AppBar position='static'>
          <Toolbar>
            {isLoggedIn ? (
              <Grid justify='space-between' container spacing={10}>
                <Grid item>
                  <Brand />
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleMenu}
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id='menu-appbar'
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
                      href='/profile'
                      color='textPrimary'
                      style={{textDecoration: 'none'}}
                    >
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link
                      href='/dashboard/pantry'
                      color='textPrimary'
                      style={{textDecoration: 'none'}}
                    >
                      <MenuItem>Pantry</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            ) : (
              <Grid justify='space-between' container spacing={10}>
                <Grid item>
                  <Brand />
                </Grid>
                <Grid item></Grid>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default NavBar;
