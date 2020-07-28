import React, {useEffect, useState} from 'react';
import {Redirect, useHistory, useParams} from 'react-router-dom';
import {Button, Card, Grid, Link, List, Typography} from '@material-ui/core';
import {useStylesForm, useStylesMain} from '../../Styles';
import {themeMain} from '../../Theme';
import {
  deleteRecipe,
  getOneRecipe,
  updateRecipe,
} from '../../actions/recipeActions';
import _ from 'lodash';
import RecipeIngredientView from './RecipeIngredientView';
import RecipeName from './RecipeName';
import CardTitle from '../CardTitle';
import RecipeButton from './RecipeButton';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';
import {Delete} from '@material-ui/icons';
import RecipeIngredientAdd from './RecipeIngredientAdd';
import {addIngredientToGroceries} from '../../actions/groceryActions';
import {convert_units} from '../../actions/unitConversions';

function RecipeExpanded(props) {
  const history = useHistory();
  const classes = useStylesForm(themeMain);
  const mainClasses = useStylesMain(themeMain);

  const recipeId = useParams().id;

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [
      {
        _id: '',
        name: '',
        quantity: '',
        quantityType: '',
        dateLastChanged: '',
      },
    ],
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    const getOneRecipeData = async () => {
      const recipeData = await getOneRecipe(recipeId);

      setRecipe(recipeData.data);
    };

    getOneRecipeData();
  }, [recipeId]);

  const handleEdit = async () => {
    await setEditMode(true);
  };

  const handleCancel = async () => {
    await setEditMode(false);
  };

  const handleDelete = async () => {
    const response = await deleteRecipe(recipe._id);

    if (response.status === 204) {
      await props.getRecipeData();
      history.push('/dashboard');
    } else {
      setError({
        errorMessage: response,
      });
    }
  };

  const handleDeleteIngredient = (ingredientId) => {
    setRecipe((prevValue) => {
      return {
        ...prevValue,
        ingredients: recipe.ingredients.filter(
          (ingredient) => ingredient._id !== ingredientId
        ),
      };
    });
  };

  const handleUpdateIngredient = (updateIngredient) => {
    // Filter out updated ingredient from list to remove old version
    const updatedIngredientList = recipe.ingredients.filter(
      (ingredient) => ingredient._id !== updateIngredient._id
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

  const addIngredientToRecipe = (ingredient) => {
    setRecipe((prevValue) => {
      return {
        ...prevValue,
        ingredients: [...recipe.ingredients, ingredient],
      };
    });
  };

  const addToGroceryList = async () => {
    for (const ingredient of recipe.ingredients) {
      const {quantityNeeded} = getHaveNeedQuantities(ingredient);

      const ingredientData = {
        name: ingredient.name,
        quantity: quantityNeeded,
        quantityType: ingredient.quantityType,
      };

      const requestResponse = await addIngredientToGroceries(ingredientData);

      if (requestResponse.status !== 201) {
        // If error encountered while adding ingredients to groceries, display
        setError({
          errorMessage: requestResponse.data,
        });
      }
    }

    // Update user payload to re-render grocery list
    await props.getUserPayload();
  };

  const getHaveNeedQuantities = (ingredient) => {
    const foundIngredient = props.pantry.find(
      (pantryIngredient) =>
        _.toLower(ingredient.name) === _.toLower(pantryIngredient.name)
    );
    let quantityNeeded;
    let quantityHave = 0;

    if (foundIngredient) {
      /* If user has some of the ingredient needed, deduct it after converting to same quantity
         type, but if pantry quantity > ingredient quantity then just show 0 as the amount needed */
      quantityHave = foundIngredient.quantity;

      if (foundIngredient.quantityType !== ingredient.quantityType) {
        quantityHave = Math.round(
          convert_units(
            foundIngredient.quantity,
            foundIngredient.quantityType,
            ingredient.quantityType
          )
        );
      }

      quantityNeeded = Math.max(ingredient.quantity - quantityHave, 0);
    } else {
      quantityNeeded = ingredient.quantity;
    }

    return {
      quantityNeeded: quantityNeeded,
      quantityHave: quantityHave,
    };
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await updateRecipe(recipe);

    if (response.status === 204) {
      await props.getRecipeData();
    } else {
      setError({
        errorMessage: response.data,
      });
    }
  };

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid item xs={12} sm={2}>
            <Link
              href={'/'}
              color='textPrimary'
              style={{textDecoration: 'none'}}
            >
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={mainClasses.submit}
              >
                Return To Dashboard
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card>
            <div className={classes.paper}>
              <form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8} align='center'>
                    <RecipeName
                      name={recipe.name}
                      editMode={editMode}
                      handleChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} align='center'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      onClick={addToGroceryList}
                    >
                      Add To Grocery List
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <CardTitle title='Recipe Ingredients' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>Ingredient Name</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography>Quant.</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography>Type</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography>Have</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography>Need</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <List className={classes.list}>
                      {recipe.ingredients.map((ingredient) => {
                        const formatName = _.startCase(
                          _.toLower(ingredient.name)
                        );
                        const formatQuantityType = _.startCase(
                          _.toLower(ingredient.quantityType)
                        );
                        const {
                          quantityNeeded,
                          quantityHave,
                        } = getHaveNeedQuantities(ingredient);

                        return (
                          <RecipeIngredientView
                            key={ingredient._id + new Date()}
                            _id={ingredient._id}
                            name={formatName}
                            editMode={editMode}
                            quantity={ingredient.quantity}
                            quantityNeeded={quantityNeeded}
                            quantityHave={quantityHave}
                            quantityType={formatQuantityType}
                            handleDeleteIngredient={handleDeleteIngredient}
                            handleUpdateIngredient={handleUpdateIngredient}
                          />
                        );
                      })}
                    </List>
                  </Grid>
                  {editMode && (
                    <Grid item xs={12}>
                      <RecipeIngredientAdd
                        key={recipe.ingredients}
                        addIngredientToRecipe={addIngredientToRecipe}
                        ingredients={props.ingredients}
                        recipeIngredients={recipe.ingredients}
                      />
                    </Grid>
                  )}
                  <Grid
                    container
                    justify='space-between'
                    className={classes.form}
                  >
                    <Grid item xs={6}>
                      <RecipeButton
                        key={editMode + new Date()}
                        editMode={editMode}
                        handleEdit={handleEdit}
                        handleCancel={handleCancel}
                        handleSubmit={handleSubmit}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Delete
                        onClick={handleDelete}
                        color='secondary'
                        className='icon'
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {!isEmpty(error.errorMessage) && (
                      <FormSubmitMessage submitMessage={error.errorMessage} />
                    )}
                  </Grid>
                </Grid>
              </form>
            </div>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default RecipeExpanded;
