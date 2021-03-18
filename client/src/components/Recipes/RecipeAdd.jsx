import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import isEmpty from 'is-empty';
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
  List,
  TextField,
} from '@material-ui/core';
import _ from 'lodash';

import useStylesMain from '../../Styles';
import { themeMain } from '../../Theme';
import RecipeIngredientAdd from './RecipeIngredientAdd';
import IngredientItem from '../Ingredients/IngredientItem';
import { addRecipe } from '../../actions/recipeActions';
import CardTitle from '../CardTitle';
import validateIngredientData from '../../actions/validateIngredientData';
import FormSubmitMessage from '../FormSubmitMessage';
import { addImage } from '../../actions/fileActions';
import ImageController from '../ImageController';
import Loader from '../Loader';

function RecipeAdd(props) {
  const classes = useStylesMain(themeMain);

  const [recipeAddAlert, setRecipeAddAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    imageUrl: '',
  });
  const [recipeImage, setRecipeImage] = useState({
    file: { image: '' },
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  const handleDelete = (ingredientId) => {
    setRecipe((prevValue) => ({
      ...prevValue,
      ingredients: recipe.ingredients.filter(
        (ingredient) => ingredient.id !== ingredientId,
      ),
    }));
  };

  const handleUpdateIngredient = (updateIngredient) => {
    // Filter out updated ingredient from list to remove old version
    const updatedIngredientList = recipe.ingredients.filter(
      (ingredient) => ingredient.id !== updateIngredient.id,
    );
    // Push new updated ingredient into updated array
    updatedIngredientList.push(updateIngredient);

    setRecipe((prevValue) => ({
      ...prevValue,
      ingredients: updatedIngredientList,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRecipe((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const addIngredientToRecipe = (ingredient) => {
    const addError = validateIngredientData(ingredient);

    if (!addError) {
      setRecipe((prevValue) => ({
        ...prevValue,
        ingredients: [...recipe.ingredients, ingredient],
      }));
    } else {
      setError({
        errorMessage: addError,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    let recipeData = { ...recipe };

    if (recipeImage.file.image) {
      const formData = new FormData();
      const fileName = recipeImage.file.image.name;
      const imageKey = `${props.userId}_${fileName}`;

      formData.append(
        'file',
        recipeImage.file.image,
        recipeImage.file.image.name,
      );

      const response = await addImage('recipe', imageKey, formData);

      try {
        recipeData = {
          ...recipeData,
          imageKey: response.data.Key,
          imageUrl: response.data.Location,
        };
      } catch (err) {
        setError({
          errorMessage: err,
        });
      }
    }

    const requestResponse = await addRecipe(recipeData);

    if (requestResponse.status === 201) {
      // Show alert that add recipe function succeeded
      setRecipeAddAlert(true);
    } else {
      setError({
        errorMessage: requestResponse,
      });
    }

    setIsLoading(false);
  };

  const reloadRecipeData = async () => {
    // If updating ingredient is successful, re-render ingredient list
    await props.getRecipeData();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!props.isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.minHeight}>
      <Container component="main">
        <Card>
          <div className={classes.paper}>
            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs={12} sm={6}>
                <ImageController
                  buttonCaption="Add File To Upload"
                  cardTitle="New Recipe Image"
                  setImage={setRecipeImage}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid item xs={12} className={classes.title}>
                  <CardTitle title="New Recipe Name" />
                </Grid>
                <Grid item xs={12} sm={8} className={classes.buttonMargin}>
                  <TextField
                    onChange={handleChange}
                    value={recipe.name}
                    variant="outlined"
                    required
                    fullWidth
                    name="name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <CardTitle title="Recipe Ingredients" />
                </Grid>
                <List className={classes.listRecipeAdd}>
                  {recipe.ingredients.map((ingredient) => {
                    const formatName = _.startCase(
                      _.toLower(ingredient.name),
                    );
                    const formatQuantityType = _.startCase(
                      _.toLower(ingredient.quantityType),
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
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Add Recipe
                  </Button>
                  <Dialog
                    open={recipeAddAlert}
                    onClose={reloadRecipeData}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Recipe Added!
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        The recipe has been added to your dashboard.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={reloadRecipeData} color="primary">
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
                <Grid item xs={12}>
                  {!isEmpty(error.errorMessage) && (
                  <FormSubmitMessage submitMessage={error.errorMessage} />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default RecipeAdd;
