import React from 'react';
import {Redirect} from 'react-router-dom';
import {Grid} from '@material-ui/core';
import _ from 'lodash';
import {useStylesMain} from '../Styles';
import {themeMain} from '../Theme';
import RecipeCard from './Recipes/RecipeCard';

function Dashboard(props) {
  const classes = useStylesMain(themeMain);

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else {
    return (
      <Grid container className={(classes.maxWidth, classes.root)}>
        {props.recipes.map((recipe) => {
          const formatName = _.startCase(_.toLower(recipe.name));

          return (
            <Grid
              item
              xs={6}
              sm={3}
              className={classes.recipeCard}
              key={recipe._id + recipe.dateLastChanged}
            >
              <RecipeCard
                key={recipe._id + recipe.dateLastChanged}
                id={recipe._id}
                name={formatName}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default Dashboard;
