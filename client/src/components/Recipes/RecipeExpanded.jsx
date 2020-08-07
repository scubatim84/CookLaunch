import React, {useEffect, useState} from 'react';
import {Redirect, useHistory, useParams} from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link,
  List,
  Typography,
} from '@material-ui/core';
import {useStylesMain} from '../../Styles';
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
import RecipeIngredientAdd from './RecipeIngredientAdd';
import {addIngredientToGroceries} from '../../actions/groceryActions';
import {convert_units} from '../../actions/unitConversions';
import {validateIngredientData} from '../../actions/validateIngredientData';
import {
  deleteIngredientFromPantry,
  updateIngredientInPantry,
} from '../../actions/pantryActions';

function RecipeExpanded(props) {
  const history = useHistory();
  const classes = useStylesMain(themeMain);

  const recipeId = useParams().id;

  const [recipe, setRecipe] = useState(null);
  const [open, setOpen] = useState(false);
  const [cookAlert, setCookAlert] = useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    props.setRecipeEdit(true);
  };

  const handleCancel = async () => {
    props.setRecipeEdit(false);

    await props.getRecipeData();
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

  const ingredientsMissing = () => {
    for (const ingredient of recipe.ingredients) {
      const {quantityNeeded} = getHaveNeedQuantities(ingredient);

      if (quantityNeeded > 0) {
        return true;
      }
    }

    return false;
  };

  const deductFromPantry = async () => {
    const areIngredientsMissing = ingredientsMissing();

    if (areIngredientsMissing) {
      setError({
        errorMessage:
          'You cannot cook a recipe if you are missing ingredients!',
      });
    } else {
      for (const ingredient of recipe.ingredients) {
        const foundIngredient = props.pantry.find(
          (pantryIngredient) =>
            _.toLower(ingredient.name) === _.toLower(pantryIngredient.name)
        );

        if (foundIngredient) {
          const updatedIngredient = {
            ...foundIngredient,
            id: foundIngredient._id,
            quantity: foundIngredient.quantity - ingredient.quantity,
          };

          let response;

          if (updatedIngredient.quantity === 0) {
            response = await deleteIngredientFromPantry(updatedIngredient.id);
          } else {
            response = await updateIngredientInPantry(updatedIngredient);
          }

          if (response.status !== 204) {
            // If request failed, return error message
            setError({
              errorMessage: response.data,
            });
          }
        }
      }

      // Show alert that cook recipe function succeeded
      setCookAlert(true);
    }
  };

  const reloadRecipe = async () => {
    // Update user payload to re-render recipe ingredients for have/need
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

    props.setRecipeEdit(false);
  };

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else if (recipe) {
    return (
      <Container component='main' maxWidth='sm'>
        <div className={classes.pageMargin}>
          <div className={classes.minHeight}>
            <Grid container>
              <Grid item xs={12}>
                <Grid item xs={12} sm={6} className={classes.buttonMargin}>
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
                    >
                      Return To Dashboard
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.pageCard}>
                  <div className={classes.paper}>
                    <form noValidate>
                      <Grid container spacing={2}>
                        <Grid item xs={12} align='center'>
                          <RecipeName
                            key={props.recipeEdit}
                            name={recipe.name}
                            editMode={props.recipeEdit}
                            handleChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CardTitle title='Recipe Ingredients' />
                        </Grid>
                        <Grid item xs={4} sm={5}>
                          <Typography>Name</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography>Quant.</Typography>
                        </Grid>
                        <Grid item xs={2} sm={3}>
                          <Typography>Type</Typography>
                        </Grid>
                        {!props.recipeEdit && (
                          <Grid item xs={2} sm={1}>
                            <Typography>Have</Typography>
                          </Grid>
                        )}
                        {!props.recipeEdit && (
                          <Grid item xs={2} sm={1}>
                            <Typography>Need</Typography>
                          </Grid>
                        )}
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
                                <Grid
                                  item
                                  xs={12}
                                  key={
                                    ingredient.name + ingredient.dateLastChanged
                                  }
                                >
                                  <RecipeIngredientView
                                    key={
                                      ingredient.name +
                                      ingredient.dateLastChanged
                                    }
                                    _id={ingredient._id}
                                    name={formatName}
                                    editMode={props.recipeEdit}
                                    quantity={ingredient.quantity}
                                    quantityNeeded={quantityNeeded}
                                    quantityHave={quantityHave}
                                    quantityType={formatQuantityType}
                                    handleDeleteIngredient={
                                      handleDeleteIngredient
                                    }
                                    handleUpdateIngredient={
                                      handleUpdateIngredient
                                    }
                                  />
                                </Grid>
                              );
                            })}
                          </List>
                        </Grid>
                        {props.recipeEdit && (
                          <Grid item xs={12}>
                            <RecipeIngredientAdd
                              key={recipe.ingredients}
                              addIngredientToRecipe={addIngredientToRecipe}
                              ingredients={props.ingredients}
                              recipeIngredients={recipe.ingredients}
                            />
                          </Grid>
                        )}
                        {!props.recipeEdit && (
                          <Grid item xs={12}>
                            <Button
                              fullWidth
                              variant='contained'
                              color='primary'
                              onClick={addToGroceryList}
                            >
                              Add To Grocery List
                            </Button>
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          <RecipeButton
                            key={props.recipeEdit}
                            editMode={props.recipeEdit}
                            handleEdit={handleEdit}
                            handleCancel={handleCancel}
                            handleSubmit={handleSubmit}
                          />
                        </Grid>
                        {!props.recipeEdit && (
                          <Grid item xs={12}>
                            <Button
                              fullWidth
                              variant='contained'
                              color='primary'
                              onClick={deductFromPantry}
                            >
                              Cook Recipe
                            </Button>
                            <Dialog
                              open={cookAlert}
                              onClose={reloadRecipe}
                              aria-labelledby='alert-dialog-title'
                              aria-describedby='alert-dialog-description'
                            >
                              <DialogTitle id='alert-dialog-title'>
                                {'Recipe Cooked!'}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id='alert-dialog-description'>
                                  The recipe ingredients have been deducted from
                                  your pantry.
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={reloadRecipe} color='primary'>
                                  Ok
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </Grid>
                        )}
                        {!props.recipeEdit && (
                          <Grid item xs={12}>
                            <Button
                              fullWidth
                              variant='contained'
                              color='primary'
                              onClick={handleClickOpen}
                            >
                              Delete Recipe
                            </Button>
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby='alert-dialog-title'
                              aria-describedby='alert-dialog-description'
                            >
                              <DialogTitle id='alert-dialog-title'>
                                {'Delete recipe?'}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id='alert-dialog-description'>
                                  This action cannot be reversed. Are you sure
                                  you want to delete this recipe?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleDelete} color='primary'>
                                  Delete
                                </Button>
                                <Button
                                  onClick={handleClose}
                                  color='primary'
                                  autoFocus
                                >
                                  Cancel
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          {!isEmpty(error.errorMessage) && (
                            <FormSubmitMessage
                              submitMessage={error.errorMessage}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}

export default RecipeExpanded;
