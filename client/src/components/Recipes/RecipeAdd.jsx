import React, {useState} from 'react';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {Grid, List, TextField, Typography} from '@material-ui/core';
import RecipeIngredientAdd from './RecipeIngredientAdd';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import IngredientItem from '../Ingredients/IngredientItem';

function RecipeAdd(props) {
  const classes = useStylesForm(themeMain);

  const [addRecipe, setAddRecipe] = useState({
    name: '',
    ingredients: [],
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  const handleDelete = async (ingredientId) => {
    setAddRecipe((prevValue) => {
      return {
        ...prevValue,
        ingredients: addRecipe.ingredients.filter(
          (ingredient) => ingredient.id !== ingredientId
        ),
      };
    });
  };

  const handleUpdateIngredient = async (updateIngredient) => {
    const ingredientsNotUpdated = addRecipe.ingredients.filter(
      (ingredient) => ingredient.id !== updateIngredient.id
    );

    setAddRecipe((prevValue) => {
      return {
        ...prevValue,
        ingredients: [ingredientsNotUpdated, updateIngredient],
      };
    });
  };

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setAddRecipe((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const addIngredientToRecipe = async (ingredient) => {
    setAddRecipe((prevValue) => {
      return {
        ...prevValue,
        ingredients: [...addRecipe.ingredients, ingredient],
      };
    });
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
                value={addRecipe.name}
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
                {addRecipe.ingredients.map((ingredient, index) => {
                  const formatName = _.startCase(_.toLower(ingredient.name));
                  const formatQuantityType = _.startCase(
                    _.toLower(ingredient.quantityType)
                  );

                  return (
                    <IngredientItem
                      key={addRecipe.ingredients[index].name}
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
                key={addRecipe.ingredients}
                addIngredientToRecipe={addIngredientToRecipe}
                ingredients={props.ingredients}
                recipeIngredients={addRecipe.ingredients}
              />
            </Grid>
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
