import React from 'react';
import {Redirect} from 'react-router-dom';
import {Grid} from '@material-ui/core';
import _ from 'lodash';
import {useStylesForm} from '../Styles';
import {themeMain} from '../Theme';
import RecipeCard from './Recipes/RecipeCard';

function Dashboard(props) {
  const classes = useStylesForm(themeMain);

  return !props.isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Grid container className={classes.root}>
      {props.recipes.map((recipe) => {
        const formatName = _.startCase(_.toLower(recipe.name));

        return (
          <Grid item xs={12} sm={4} md={3}>
            <RecipeCard
              key={recipe._id + new Date()}
              id={recipe._id}
              name={formatName}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Dashboard;
