import React from 'react';
import {Redirect} from 'react-router-dom';
import Ingredients from './Ingredients';
import {Grid} from '@material-ui/core';

function Dashboard(props) {
  return !props.isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Ingredients
          getIngredientData={props.getIngredientData}
          ingredients={props.ingredients}
          email={props.email}
          firstName={props.firstName}
          lastName={props.lastName}
          handleLoggedIn={props.handleLoggedIn}
          isLoggedIn={props.isLoggedIn}
        />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
