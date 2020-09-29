import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import _ from 'lodash';
import isEmpty from 'is-empty';
import {
  Button,
  Card,
  CardMedia,
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
import { makeStyles } from '@material-ui/core/styles';

import { themeMain } from '../../Theme';
import {
  deleteRecipe,
  getOneRecipe,
  updateRecipe,
} from '../../actions/recipeActions';
import { addIngredientToGroceries } from '../../actions/groceryActions';
import { convert_units } from '../../actions/unitConversions';
import { validateIngredientData } from '../../actions/validateIngredientData';
import {
  deleteIngredientFromPantry,
  updateIngredientInPantry,
} from '../../actions/pantryActions';
import { addImage, deleteImage } from '../../actions/fileActions';
import RecipeIngredientView from './RecipeIngredientView';
import RecipeName from './RecipeName';
import CardTitle from '../CardTitle';
import RecipeButton from './RecipeButton';
import FormSubmitMessage from '../FormSubmitMessage';
import RecipeIngredientAdd from './RecipeIngredientAdd';
import Loader from '../Loader';
import ImageController from '../ImageController';
import defaultImage from '../../images/defaultrecipeimage.jpg';

function RecipeExpanded(props) {
  const { recipeId, userId } = props;

  const history = useHistory();
  const classes = useStyles(themeMain);

  const [recipe, setRecipe] = useState(null);
  const [updateImage, setUpdateImage] = useState({
    file: { image: '' },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageKeyToDelete, setImageKeyToDelete] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [cookAlert, setCookAlert] = useState(false);
  const [groceryAddAlert, setGroceryAddAlert] = useState(false);
  const [error, setError] = useState({
    errorMessage: '',
  });

  const getOneRecipeData = useCallback(async () => {
    if (recipeId) {
      const response = await getOneRecipe(recipeId);

      setRecipe(response.data);
    }
  }, [recipeId]);

  useEffect(() => {
    getOneRecipeData();
  }, [getOneRecipeData, editMode]);

  useEffect(() => {
    const handleDelete = async () => {
      await deleteImage(imageKeyToDelete);
    };

    if (imageKeyToDelete && !editMode) {
      handleDelete();
    }
  }, [imageKeyToDelete, editMode]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = async () => {
    setImageKeyToDelete(null);
    setEditMode(false);
  };

  const handleDelete = async () => {
    const response = await deleteRecipe(recipe._id);

    if (response.status === 204) {
      if (recipe.imageKey) {
        const imageResponse = await deleteImage(recipe.imageKey);

        if (!imageResponse.status === 204) {
          setError({
            errorMessage: imageResponse,
          });
        }
      }

      if (!error.errorMessage) {
        await props.getRecipeData();
        history.push('/dashboard');
      }
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
      const { quantityNeeded } = getHaveNeedQuantities(ingredient);

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

    // Show alert that add to grocery list function succeeded
    setGroceryAddAlert(true);
  };

  const ingredientsMissing = () => {
    for (const ingredient of recipe.ingredients) {
      const { quantityNeeded } = getHaveNeedQuantities(ingredient);

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
            ingredient.name.toUpperCase() ===
            pantryIngredient.name.toUpperCase()
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

  const reloadRecipeIngredients = async () => {
    // Update user payload to re-render recipe ingredients for have/need
    await props.getUserPayload();

    setCookAlert(false);
  };

  const reloadRecipe = async () => {
    // Update recipe to re-render changes
    await props.getRecipeData();

    setGroceryAddAlert(false);
  };

  const getHaveNeedQuantities = (ingredient) => {
    const foundIngredient = props.pantry.find(
      (pantryIngredient) =>
        ingredient.name.toUpperCase() === pantryIngredient.name.toUpperCase()
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRecipe((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    let recipeData = { ...recipe };

    if (updateImage.file.image) {
      const changeResponse = await handleChangeImage(recipeData);

      if (!error.errorMessage) {
        recipeData = changeResponse;
      } else {
        return;
      }
    }

    const response = await updateRecipe(recipeData);

    if (response.status === 204) {
      setEditMode(false);
      setIsLoading(false);
    } else {
      setError({
        errorMessage: response.data,
      });
    }
  };

  const handleChangeImage = async (recipeData) => {
    const formData = new FormData();
    const fileName = updateImage.file.image.name;
    const imageKey = userId + '_' + fileName;

    formData.append(
      'file',
      updateImage.file.image,
      updateImage.file.image.name
    );

    const response = await addImage('recipe', imageKey, formData);

    try {
      if (imageKey !== recipe.imageKey.split('/')[1]) {
        await handleDeleteImage(recipe.imageKey);
      }

      return (recipeData = {
        ...recipeData,
        imageKey: response.data.Key,
        imageUrl: response.data.Location,
      });
    } catch (err) {
      setError({
        errorMessage: err,
      });
    }
  };

  const handleDeleteImage = async () => {
    setImageKeyToDelete(recipe.imageKey);

    setRecipe((prevValue) => {
      return {
        ...prevValue,
        imageUrl: '',
        imageKey: '',
      };
    });
  };

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (!recipe?._id || isLoading) {
    return <Loader />;
  }

  return (
    <Container component='main' maxWidth='lg'>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} className={classes.button}>
          <Link
            href={'/'}
            color='textPrimary'
            style={{ textDecoration: 'none' }}
          >
            <Button type='submit' fullWidth variant='contained' color='primary'>
              Return To Dashboard
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} className={classes.pageContainer}>
          <Card className={classes.card}>
            <div className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {editMode && (
                    <ImageController
                      imageUrl={recipe.imageUrl ? recipe.imageUrl : undefined}
                      buttonCaption={
                        recipe.imageKey
                          ? 'Replace Recipe Image'
                          : 'Add Recipe Image'
                      }
                      cardTitle='Recipe Image'
                      setImage={setUpdateImage}
                      deleteImage={handleDeleteImage}
                    />
                  )}
                  {!editMode && (
                    <CardMedia
                      className={classes.image}
                      image={
                        recipe.imageUrl.length > 0
                          ? recipe.imageUrl
                          : defaultImage
                      }
                      title={recipe.name}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6} className={classes.recipeDetails}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} align='center'>
                      <RecipeName
                        name={recipe.name}
                        editMode={editMode}
                        handleChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CardTitle title='Recipe Ingredients' />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Typography>Name</Typography>
                    </Grid>
                    <Grid item xs={2} sm={3}>
                      <Typography>Quant.</Typography>
                    </Grid>
                    <Grid item xs={2} sm={3}>
                      <Typography>Type</Typography>
                    </Grid>
                    {!editMode && (
                      <Grid item xs={2} sm={1}>
                        <Typography>Have</Typography>
                      </Grid>
                    )}
                    {!editMode && (
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
                              key={ingredient.name + ingredient.dateLastChanged}
                            >
                              <RecipeIngredientView
                                key={
                                  ingredient.name + ingredient.dateLastChanged
                                }
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
                            </Grid>
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
                    {!editMode && (
                      <Grid item xs={12} className={classes.button}>
                        <Button
                          fullWidth
                          variant='outlined'
                          color='primary'
                          onClick={addToGroceryList}
                        >
                          Add To Grocery List
                        </Button>
                        <Dialog
                          open={groceryAddAlert}
                          onClose={reloadRecipe}
                          aria-labelledby='alert-dialog-title'
                          aria-describedby='alert-dialog-description'
                        >
                          <DialogTitle id='alert-dialog-title'>
                            {'Grocery List Updated!'}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id='alert-dialog-description'>
                              The recipe ingredients have been added to your
                              your grocery list.
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
                    <Grid item xs={12} className={classes.button}>
                      <RecipeButton
                        key={editMode + new Date()}
                        editMode={editMode}
                        handleEdit={handleEdit}
                        handleCancel={handleCancel}
                        handleSubmit={handleSubmit}
                      />
                    </Grid>
                    {!editMode && (
                      <Grid item xs={12} className={classes.button}>
                        <Button
                          fullWidth
                          variant='outlined'
                          color='primary'
                          onClick={deductFromPantry}
                        >
                          Cook Recipe
                        </Button>
                        <Dialog
                          open={cookAlert}
                          onClose={reloadRecipeIngredients}
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
                            <Button
                              onClick={reloadRecipeIngredients}
                              color='primary'
                            >
                              Ok
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Grid>
                    )}
                    {!editMode && (
                      <Grid item xs={12} className={classes.button}>
                        <Button
                          fullWidth
                          variant='outlined'
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
                              This action cannot be reversed. Are you sure you
                              want to delete this recipe?
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
                        <FormSubmitMessage submitMessage={error.errorMessage} />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
  card: {
    marginTop: theme.spacing(1),
  },
  list: {
    width: '100%',
    maxHeight: 300,
    overflow: 'auto',
    marginBottom: theme.spacing(1),
  },
  image: {
    height: '100%',
    width: 'auto',
    paddingTop: '56.25%', // 16:9
  },
  pageContainer: {
    direction: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    minHeight: '100vh',
  },
  paper: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  recipeDetails: {
    alignItems: 'flex-end',
  },
}));

export default RecipeExpanded;
