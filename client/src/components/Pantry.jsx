import React from 'react';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';
import {
  addIngredientToPantry,
  deleteIngredientFromPantry,
  updateIngredientInPantry,
} from '../actions/pantryActions';
import IngredientAdd from './Ingredients/IngredientAdd';
import IngredientItem from './Ingredients/IngredientItem';
import {useStylesForm} from '../Styles';
import {themeMain} from '../Theme';
import {Card, Container, Grid, Typography} from '@material-ui/core';

function Pantry(props) {
  const classes = useStylesForm(themeMain);

  const handleDelete = async (ingredientId) => {
    const requestResponse = await deleteIngredientFromPantry(ingredientId);

    if (requestResponse.status === 204) {
      // Update user payload to re-render pantry
      await props.getUserPayload();
    } else {
      // If request failed, return error message to child component
      return requestResponse.data;
    }
  };

  const handleUpdateIngredient = async (updateIngredient) => {
    const requestResponse = await updateIngredientInPantry(updateIngredient);

    if (requestResponse.status === 204) {
      // Update user payload to re-render pantry
      await props.getUserPayload();
    } else {
      // If request failed, return error message to child component
      return requestResponse.data;
    }
  };

  const handleAddIngredient = async (addIngredient) => {
    const requestResponse = await addIngredientToPantry(addIngredient);

    console.log(requestResponse);

    if (requestResponse.status === 201) {
      // Update user payload to re-render pantry
      await props.getUserPayload();
    } else {
      // If request failed, return error message to child component
      return requestResponse.data;
    }
  };

  return !props.isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Container component='main' maxWidth='md'>
      <Card className={classes.root}>
        <div className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} align='center'>
              <Typography component='h1' variant='h5'>
                {props.firstName}'s Pantry
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {props.pantry.map((ingredient, index) => {
                const formatName = _.startCase(_.toLower(ingredient.name));
                const formatQuantityType = _.startCase(
                  _.toLower(ingredient.quantityType)
                );

                return (
                  <IngredientItem
                    key={props.pantry[index].dateLastChanged}
                    id={ingredient._id}
                    name={formatName}
                    quantity={ingredient.quantity}
                    quantityType={formatQuantityType}
                    handleDelete={handleDelete}
                    handleUpdateIngredient={handleUpdateIngredient}
                  />
                );
              })}
            </Grid>
          </Grid>
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.paper}>
          <Grid item xs={12}>
            <IngredientAdd
              key={props.pantry}
              name='Pantry'
              ingredients={props.ingredients}
              handleAddIngredient={handleAddIngredient}
            />
          </Grid>
        </div>
      </Card>
    </Container>
  );
}

export default Pantry;
