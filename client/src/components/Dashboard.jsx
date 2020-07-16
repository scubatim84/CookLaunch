import React from 'react';
import {Redirect} from 'react-router-dom';
import {Grid} from '@material-ui/core';

function Dashboard(props) {
  return !props.isLoggedIn ? <Redirect to='/login' /> : <Grid container></Grid>;
}

export default Dashboard;
