import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';
import IngredientAdd from './Ingredients/IngredientAdd';
import IngredientItem from './Ingredients/IngredientItem';
import {useStylesMain} from '../Styles';
import {themeMain} from '../Theme';
import {Button, Card, Container, Grid, List} from '@material-ui/core';
import CardTitle from './CardTitle';
import {
  addIngredientToGroceries,
  deleteIngredientFromGroceries,
  updateIngredientInGroceries,
} from '../actions/groceryActions';
import {convert_units} from '../actions/unitConversions';
import isEmpty from 'is-empty';
import FormSubmitMessage from './FormSubmitMessage';
import {
  addIngredientToPantry,
  updateIngredientInPantry,
} from '../actions/pantryActions';

function Groceries(props) {
  const classes = useStylesMain(themeMain);

  const [groceryList, setGroceryList] = useState({data: []});
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    if (props.groceries && props.groceries.length > 0) {
      let rawGroceryList = props.groceries;
      let sortedGroceries = rawGroceryList.sort((a, b) => {
        if (a.checked === true && b.checked === false) {
          return 1;
        } else if (b.checked === true && a.checked === false) {
          return -1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });

      setGroceryList({data: sortedGroceries});
    }
  }, [props.groceries]);

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
    const response = await addIngredientToGroceries(addIngredient);

    if (response.status === 201) {
      // Update user payload to re-render pantry
      await props.getUserPayload();
    } else {
      // If request failed, return error message to child component
      return response.data;
    }
  };

  const handleAddGroceryListToPantry = async () => {
    for (const groceryIngredient of groceryList.data) {
      if (groceryIngredient.checked !== true) {
        continue;
      }

      const foundIngredient = props.pantry.find(
        (ingredient) =>
          _.lowerCase(ingredient.name) === _.lowerCase(groceryIngredient.name)
      );

      if (foundIngredient) {
        /* Convert grocery ingredient quantity to pantry quantity using
           the convert_units function because quantity types could be
           different between grocery list and pantry */
        const oldQuantityType = groceryIngredient.quantityType;
        const newQuantityType = foundIngredient.quantityType;
        const quantity = groceryIngredient.quantity;

        let newQuantity = parseFloat(
          convert_units(quantity, oldQuantityType, newQuantityType)
        );
        /* Once the grocery ingredient quantity is converted, add existing
           pantry quantity to value prior to updating pantry */
        newQuantity += foundIngredient.quantity;

        if (isNaN(newQuantity)) {
          setError({
            errorMessage: `You cannot convert ${oldQuantityType} to ${newQuantityType}.`,
          });
        } else {
          const ingredientData = {
            id: foundIngredient._id,
            name: foundIngredient.name,
            quantity: newQuantity,
            quantityType: newQuantityType,
          };

          const response = await updateIngredientInPantry(ingredientData);

          if (response.status === 204) {
            // Once ingredient is updated in pantry, remove from grocery list
            await deleteIngredientFromGroceries(groceryIngredient._id);
          } else {
            // If request failed, return error message
            setError({
              errorMessage: response.data,
            });
          }
        }
      } else {
        const response = await addIngredientToPantry(groceryIngredient);

        if (response.status === 201) {
          // Once ingredient is added in pantry, remove from grocery list
          await deleteIngredientFromGroceries(groceryIngredient._id);
        } else {
          // If request failed, return error message
          setError({
            errorMessage: response.data,
          });
        }
      }
    }

    // Update user payload to re-render grocery list once function completes
    await props.getUserPayload();
  };

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else {
    return (
      <Container component='main' maxWidth='md'>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Card>
              <div className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12} align='center'>
                    <CardTitle title={`${props.firstName}'s Grocery List`} />
                  </Grid>
                  <List className={classes.list}>
                    {groceryList.data.map((ingredient, index) => {
                      const formatName = _.startCase(
                        _.toLower(ingredient.name)
                      );
                      const formatQuantityType = _.startCase(
                        _.toLower(ingredient.quantityType)
                      );

                      return (
                        <Grid item xs={12}>
                          <IngredientItem
                            key={
                              ingredient._id +
                              props.groceries[index].dateLastChanged
                            }
                            id={ingredient._id}
                            groceryIngredient={true}
                            name={formatName}
                            quantity={ingredient.quantity}
                            quantityType={formatQuantityType}
                            checked={ingredient.checked}
                            handleDelete={handleDelete}
                            handleUpdateIngredient={handleUpdateIngredient}
                          />
                        </Grid>
                      );
                    })}
                  </List>
                  <Grid item xs={12} align='center'>
                    <Button
                      onClick={handleAddGroceryListToPantry}
                      type='submit'
                      variant='contained'
                      color='primary'
                    >
                      Complete Shopping Trip
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
          </Grid>
          <Grid item xs={12}>
            <IngredientAdd
              key={props.groceries}
              name='Groceries'
              pantry={props.pantry}
              ingredients={props.ingredients}
              handleAddIngredient={handleAddIngredient}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Groceries;
