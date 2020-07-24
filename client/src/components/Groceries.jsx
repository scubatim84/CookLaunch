import React from 'react';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';
import IngredientAdd from './Ingredients/IngredientAdd';
import IngredientItem from './Ingredients/IngredientItem';
import {useStylesForm} from '../Styles';
import {themeMain} from '../Theme';
import {Card, Container, Grid} from '@material-ui/core';
import CardTitle from './CardTitle';
import {
  addIngredientToGroceries,
  deleteIngredientFromGroceries,
  updateIngredientInGroceries,
} from '../actions/groceryActions';

function Groceries(props) {
  const classes = useStylesForm(themeMain);

  const handleDelete = async (ingredientId) => {
    const requestResponse = await deleteIngredientFromGroceries(ingredientId);

    if (requestResponse.status === 204) {
      // Update user payload to re-render pantry
      await props.getUserPayload();
    } else {
      // If request failed, return error message to child component
      return requestResponse.data;
    }
  };

  const handleUpdateIngredient = async (updateIngredient) => {
    const requestResponse = await updateIngredientInGroceries(updateIngredient);

    if (requestResponse.status === 204) {
      // Update user payload to re-render pantry
      await props.getUserPayload();
    } else {
      // If request failed, return error message to child component
      return requestResponse.data;
    }
  };

  const handleAddIngredient = async (addIngredient) => {
    const requestResponse = await addIngredientToGroceries(addIngredient);

    if (requestResponse.status === 201) {
      // Update user payload to re-render pantry
      await props.getUserPayload();
    } else {
      // If request failed, return error message to child component
      return requestResponse.data;
    }
  };

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else {
    return (
      <Container component='main' maxWidth='md'>
        <Card className={classes.root}>
          <div className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} align='center'>
                <CardTitle title={`${props.firstName}'s Grocery List`} />
              </Grid>
              <Grid item xs={12}>
                {props.groceries.map((ingredient, index) => {
                  const formatName = _.startCase(_.toLower(ingredient.name));
                  const formatQuantityType = _.startCase(
                    _.toLower(ingredient.quantityType)
                  );

                  return (
                    <IngredientItem
                      key={props.groceries[index].dateLastChanged}
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
                key={props.groceries}
                name='Groceries'
                ingredients={props.ingredients}
                handleAddIngredient={handleAddIngredient}
              />
            </Grid>
          </div>
        </Card>
      </Container>
    );
  }
}

export default Groceries;
