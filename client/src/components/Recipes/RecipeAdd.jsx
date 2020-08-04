import React, {useState} from 'react';
import {useStylesMain} from '../../Styles';
import {themeMain} from '../../Theme';
import {
  Button,
  Card,
  Container,
  Grid,
  List,
  TextField,
} from '@material-ui/core';
import RecipeIngredientAdd from './RecipeIngredientAdd';
import _ from 'lodash';
import IngredientItem from '../Ingredients/IngredientItem';
import {addRecipe} from '../../actions/recipeActions';
import {Redirect} from 'react-router-dom';
import CardTitle from '../CardTitle';
import {validateIngredientData} from '../../actions/validateIngredientData';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';

function RecipeAdd(props) {
  const classes = useStylesMain(themeMain);

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
    const error = validateIngredientData(ingredient);

    if (!error) {
      setRecipe((prevValue) => {
        return {
          ...prevValue,
          ingredients: [...recipe.ingredients, ingredient],
        };
      });
    } else {
      setError({
        errorMessage: error,
      });
    }
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

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else {
    return (
      <Container component='main' maxWidth='md'>
        <Card>
          <div className={classes.paper}>
            <Grid container spacing={1} justify='center' alignItems='center'>
              <Grid item xs={12} className={classes.title}>
                <CardTitle title='New Recipe Name' />
              </Grid>
              <Grid item xs={12} sm={8} className={classes.buttonMargin}>
                <TextField
                  onChange={handleChange}
                  value={recipe.name}
                  variant='outlined'
                  required
                  fullWidth
                  name='name'
                />
              </Grid>
              <Grid item xs={12}>
                <CardTitle title='Recipe Ingredients' />
              </Grid>
              <List className={classes.listRecipeAdd}>
                {recipe.ingredients.map((ingredient) => {
                  const formatName = _.startCase(_.toLower(ingredient.name));
                  const formatQuantityType = _.startCase(
                    _.toLower(ingredient.quantityType)
                  );

                  return (
                    <Grid
                      item
                      xs={12}
                      key={ingredient.name + ingredient.dateLastChanged}
                    >
                      <IngredientItem
                        key={ingredient.name + ingredient.dateLastChanged}
                        id={ingredient.id}
                        name={formatName}
                        quantity={ingredient.quantity}
                        quantityType={formatQuantityType}
                        handleDelete={handleDelete}
                        handleUpdateIngredient={handleUpdateIngredient}
                      />
                    </Grid>
                  );
                })}
              </List>
              <Grid item xs={12}>
                <RecipeIngredientAdd
                  key={recipe.ingredients}
                  addIngredientToRecipe={addIngredientToRecipe}
                  ingredients={props.ingredients}
                  recipeIngredients={recipe.ingredients}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Add Recipe
                </Button>
              </Grid>
              <Grid item xs={12}>
                {!isEmpty(error.errorMessage) && (
                  <FormSubmitMessage submitMessage={error.errorMessage} />
                )}
              </Grid>
            </Grid>
          </div>
        </Card>
      </Container>
    );
  }
}

export default RecipeAdd;
