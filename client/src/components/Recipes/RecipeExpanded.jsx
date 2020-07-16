import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {getOneRecipe} from '../../actions/recipeActions';
import Grid from '@material-ui/core/Grid';

function RecipeCard(props) {
  const classes = useStylesForm(themeMain);

  const recipeId = useParams().id;
  const getRecipeData = async () => {
    const recipeData = await getOneRecipe(recipeId);

    setRecipe(recipeData.data);
  };

  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    getRecipeData();
  }, [recipeId]);

  return !props.isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Grid container justify='center' className={classes.root}>
      <Grid item xs={12} sm={8}>
        <Card className={classes.card}>
          <CardContent>
            <Typography color='textPrimary'>{recipe.name}</Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Expanded Recipe View</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RecipeCard;
