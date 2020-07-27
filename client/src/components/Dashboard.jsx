import React from 'react';
import {Redirect} from 'react-router-dom';
import {Grid} from '@material-ui/core';
import _ from 'lodash';
import {useStylesForm} from '../Styles';
import {themeMain} from '../Theme';
import RecipeCard from './Recipes/RecipeCard';

function Dashboard(props) {
  const classes = useStylesForm(themeMain);

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else {
    return (
      <Grid container className={classes.root}>
        {props.recipes.map((recipe) => {
          const formatName = _.startCase(_.toLower(recipe.name));

          return (
            <RecipeCard
              key={recipe._id + recipe.dateLastChanged}
              id={recipe._id}
              name={formatName}
            />
          );
        })}
      </Grid>
    );
  }
}

export default Dashboard;
