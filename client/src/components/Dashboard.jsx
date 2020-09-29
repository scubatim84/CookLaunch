import React from 'react';
import { Redirect } from 'react-router-dom';
import { Backdrop, CircularProgress, Grid } from '@material-ui/core';
import _ from 'lodash';
import { useStylesMain } from '../Styles';
import { themeMain } from '../Theme';
import RecipeCard from './Recipes/RecipeCard';
import Loader from './Loader';

function Dashboard(props) {
  const classes = useStylesMain(themeMain);

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else if (!props.recipes) {
    return <Loader />;
  } else if (props.id && props.recipes.length === 0) {
    return <Redirect to='/welcome' />;
  } else if (props.recipes) {
    return (
      <div className={classes.minHeight}>
        <Backdrop className={classes.backdrop} open={!props.recipes}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <Grid container className={(classes.maxWidth, classes.root)}>
          {props.recipes.map((recipe) => {
            const formatName = _.startCase(_.toLower(recipe.name));

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                className={classes.recipeCard}
                key={recipe._id + recipe.dateLastChanged}
              >
                <RecipeCard
                  key={recipe._id + recipe.dateLastChanged}
                  id={recipe._id}
                  imageUrl={recipe.imageUrl}
                  name={formatName}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
