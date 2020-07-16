import React from 'react';
import {Redirect} from 'react-router-dom';
import IngredientNames from './Ingredients/IngredientNames';
import {Grid} from '@material-ui/core';
import RecipeAdd from './Recipes/RecipeAdd';

function Dashboard(props) {
  return !props.isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <IngredientNames
          key={props.ingredients}
          getIngredientData={props.getIngredientData}
          ingredients={props.ingredients}
          id={props.id}
          email={props.email}
          firstName={props.firstName}
          lastName={props.lastName}
          handleLoggedIn={props.handleLoggedIn}
          isLoggedIn={props.isLoggedIn}
        />
      </Grid>
      <Grid item xs={12} sm={7}>
        <RecipeAdd
          key={props.recipes}
          getRecipeData={props.getRecipeData}
          ingredients={props.ingredients}
          id={props.id}
        />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
