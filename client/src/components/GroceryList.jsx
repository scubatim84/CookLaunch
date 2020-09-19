import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import IngredientAdd from './Ingredients/IngredientAdd';
import IngredientItem from './Ingredients/IngredientItem';
import { makeStyles } from '@material-ui/core/styles';
import { themeMain } from '../Theme';
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
} from '@material-ui/core';
import CardTitle from './CardTitle';
import {
  addIngredientToGroceries,
  deleteIngredientFromGroceries,
  updateIngredientInGroceries,
} from '../actions/groceryActions';
import { convert_units } from '../actions/unitConversions';
import isEmpty from 'is-empty';
import FormSubmitMessage from './FormSubmitMessage';
import {
  addIngredientToPantry,
  updateIngredientInPantry,
} from '../actions/pantryActions';
import Loader from './Loader';

function GroceryList(props) {
  const classes = useStyles(themeMain);

  const [groceryList, setGroceryList] = useState(null);
  const [updateNeeded, setUpdateNeeded] = useState(false);
  const [groceryComplete, setGroceryComplete] = useState(false);
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

      setGroceryList({ data: sortedGroceries });
    } else if (props.groceries) {
      setGroceryList({ data: [] });
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
    setUpdateNeeded(true);

    const requestResponse = await updateIngredientInGroceries(updateIngredient);

    if (requestResponse.status === 204) {
      // Update user payload to re-render pantry
      await props.getUserPayload();
    } else {
      // If request failed, return error message to child component
      return requestResponse.data;
    }

    setUpdateNeeded(false);
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
      if (groceryIngredient.groceryExtra) {
        await deleteIngredientFromGroceries(groceryIngredient._id);
        continue;
      }

      if (groceryIngredient.checked !== true) {
        continue;
      }

      const foundIngredient = props.pantry.find(
        (ingredient) =>
          ingredient.name.toUpperCase() === groceryIngredient.name.toUpperCase()
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

    // Show alert that complete shopping trip function succeeded
    setGroceryComplete(true);
  };

  const reloadGroceryList = async () => {
    await props.getUserPayload();
  };

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else if (!groceryList || !props.firstName || updateNeeded) {
    return <Loader />;
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <Grid container className={classes.pageMarginBottom}>
          <Grid item xs={12} className={classes.pageMarginBottom}>
            <Card>
              <div className={classes.paper}>
                <Grid item xs={12}>
                  <CardTitle title={`${props.firstName}'s Grocery List`} />
                </Grid>
                <List className={classes.list}>
                  {groceryList.data.map((ingredient) => {
                    const formatName = _.startCase(_.toLower(ingredient.name));
                    const formatQuantityType = _.startCase(
                      _.toLower(ingredient.quantityType)
                    );

                    return (
                      <Grid
                        item
                        xs={11}
                        key={ingredient.name + ingredient.dateLastChanged}
                      >
                        <IngredientItem
                          key={ingredient.name + ingredient.dateLastChanged}
                          id={ingredient._id}
                          groceryIngredient={true}
                          name={formatName}
                          quantity={ingredient.quantity}
                          quantityType={formatQuantityType}
                          groceryExtra={ingredient.groceryExtra}
                          checked={ingredient.checked}
                          handleDelete={handleDelete}
                          handleUpdateIngredient={handleUpdateIngredient}
                        />
                      </Grid>
                    );
                  })}
                </List>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    onClick={handleAddGroceryListToPantry}
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    Complete Shopping Trip
                  </Button>
                  <Dialog
                    open={groceryComplete}
                    onClose={reloadGroceryList}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogTitle id='alert-dialog-title'>
                      {'Shopping Trip Completed!'}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id='alert-dialog-description'>
                        The checked off grocery list ingredients, which are not
                        extras, have been added to your pantry.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={reloadGroceryList} color='primary'>
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
                {!isEmpty(error.errorMessage) && (
                  <Grid item xs={12}>
                    <FormSubmitMessage submitMessage={error.errorMessage} />
                  </Grid>
                )}
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <IngredientAdd
              key={props.groceries}
              name='Groceries'
              groceryListAdd={true}
              groceries={props.groceries}
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

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: 350,
    overflow: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  pageMarginBottom: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default GroceryList;
