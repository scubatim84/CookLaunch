import React, {useState} from 'react';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {Button, Grid, List, TextField, Typography} from '@material-ui/core';
import RecipeIngredientAdd from './RecipeIngredientAdd';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import IngredientItem from '../Ingredients/IngredientItem';
import {addRecipe} from '../../actions/recipeActions';

function RecipeAdd(props) {
  const classes = useStylesForm(themeMain);

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  const handleDelete = async (ingredientId) => {
    setRecipe((prevValue) => {
      return {
        ...prevValue,
        ingredients: recipe.ingredients.filter(
          (ingredient) => ingredient.id !== ingredientId
        ),
      };
    });
  };

  const handleUpdateIngredient = async (updateIngredient) => {
    // Filter out updated ingredient from list to remove old version
    const updatedIngredientList = recipe.ingredients.filter(
      (ingredient) => ingredient.id !== updateIngredient.id
    );
    // Push new updated ingredient into updated array
    updatedIngredientList.push(updateIngredient);

    setRecipe((prevValue) => {
      return {
        ...prevValue,
        ingredients: updatedIngredientList,
      };
    });
  };

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setRecipe((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const addIngredientToRecipe = async (ingredient) => {
    setRecipe((prevValue) => {
      return {
        ...prevValue,
        ingredients: [...recipe.ingredients, ingredient],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestResponse = await addRecipe(recipe);

    if (requestResponse.status === 201) {
      // If updating ingredient is successful, re-render ingredient list
      await props.getRecipeData();
    } else {
      setError({
        errorMessage: requestResponse.authResponsePayload,
      });
    }
  };

  return (
    <Card className={classes.root}>
      <div className={classes.paper}>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} align='center'>
              <Typography component='h1' variant='h5'>
                New Recipe
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} align='center'>
              <Typography component='h1' variant='h5'>
                Name
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} align='center'>
              <TextField
                onChange={handleChange}
                value={recipe.name}
                variant='outlined'
                required
                fullWidth
                name='name'
              />
            </Grid>
            <Grid item xs={12} align='center'>
              <Typography component='h1' variant='h5'>
                Recipe Ingredients
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <List className={classes.list}>
                {recipe.ingredients.map((ingredient, index) => {
                  const formatName = _.startCase(_.toLower(ingredient.name));
                  const formatQuantityType = _.startCase(
                    _.toLower(ingredient.quantityType)
                  );

                  return (
                    <IngredientItem
                      key={ingredient.id + new Date()}
                      id={ingredient.id}
                      name={formatName}
                      quantity={ingredient.quantity}
                      quantityType={formatQuantityType}
                      handleDelete={handleDelete}
                      handleUpdateIngredient={handleUpdateIngredient}
                    />
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={12}>
              <RecipeIngredientAdd
                key={recipe.ingredients}
                addIngredientToRecipe={addIngredientToRecipe}
                ingredients={props.ingredients}
                recipeIngredients={recipe.ingredients}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} align='center'>
            <Button
              onClick={handleSubmit}
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Add Recipe
            </Button>
          </Grid>
          <Grid item xs={12}>
            {!isEmpty(error.errorMessage) && (
              <FormSubmitMessage submitMessage={error.errorMessage} />
            )}
          </Grid>
        </form>
      </div>
    </Card>
  );
}

export default RecipeAdd;
