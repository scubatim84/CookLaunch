import React, {useState} from 'react';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {Grid, List, Typography} from '@material-ui/core';
import RecipeIngredientAdd from './RecipeIngredientAdd';
import _ from 'lodash';

function RecipeAdd(props) {
  const classes = useStylesForm(themeMain);

  const [addRecipe, setAddRecipe] = useState({
    name: '',
    ingredients: [],
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  const addIngredientToRecipe = async (ingredient) => {
    setAddRecipe((prevValue) => {
      return {
        ...prevValue,
        ingredients: [...addRecipe.ingredients, ingredient],
      };
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <form noValidate>
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} align='center'>
              <Typography component='h1' variant='h5'>
                Add Recipe
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <List className={classes.list}>
                {addRecipe.ingredients.map((ingredient) => {
                  const formatName = _.startCase(_.toLower(ingredient.name));

                  return <Typography>{formatName}</Typography>;
                })}
              </List>
            </Grid>

            <Grid item xs={12}>
              <RecipeIngredientAdd
                key={addRecipe.ingredients}
                addIngredientToRecipe={addIngredientToRecipe}
                ingredients={props.ingredients}
                recipeIngredients={addRecipe.ingredients}
              />
            </Grid>
            <Grid item xs={12}>
              {!isEmpty(error.errorMessage) && (
                <FormSubmitMessage submitMessage={error.errorMessage} />
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default RecipeAdd;
