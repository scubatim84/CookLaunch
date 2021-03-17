/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
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
import isEmpty from 'is-empty';
import IngredientAdd from './Ingredients/IngredientAdd';
import IngredientItem from './Ingredients/IngredientItem';
import { themeMain } from '../Theme';
import CardTitle from './CardTitle';
import {
  addIngredientToGroceries,
  deleteIngredientFromGroceries,
  updateIngredientInGroceries,
} from '../actions/groceryActions';
import convertUnits from '../actions/unitConversions';
import FormSubmitMessage from './FormSubmitMessage';
import {
  addIngredientToPantry,
  updateIngredientInPantry,
} from '../actions/pantryActions';
import Loader from './Loader';

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

function GroceryList(props) {
  const classes = useStyles(themeMain);

  const [groceryList, setGroceryList] = useState(null);
  const [updateNeeded, setUpdateNeeded] = useState(false);
  const [confirmTripDialog, setConfirmTripDialog] = useState(false);
  const [groceryComplete, setGroceryComplete] = useState(false);
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    if (props.groceries && props.groceries.length > 0) {
      const rawGroceryList = props.groceries;
      const sortedGroceries = rawGroceryList.sort((a, b) => {
        if (a.checked === true && b.checked === false) {
          return 1;
        } if (b.checked === true && a.checked === false) {
          return -1;
        }
        return a.name.localeCompare(b.name);
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
      return props.getUserPayload();
    }

    // If request failed, return error message to child component
    return requestResponse.data;
  };

  const handleUpdateIngredient = async (updateIngredient) => {
    setUpdateNeeded(true);

    const requestResponse = await updateIngredientInGroceries(updateIngredient);

    if (requestResponse.status === 204) {
      // Update user payload to re-render pantry
      props.getUserPayload();
    } else {
      // If request failed, return error message to child component
      return requestResponse.data;
    }

    return setUpdateNeeded(false);
  };

  const handleAddIngredient = async (addIngredient) => {
    const response = await addIngredientToGroceries(addIngredient);

    if (response.status === 201) {
      // Update user payload to re-render pantry
      return props.getUserPayload();
    }

    // If request failed, return error message to child component
    return response.data;
  };

  const removeGroceryExtrasFromList = async () => {
    groceryList.data.map(async (groceryIngredient) => {
      if (groceryIngredient.groceryExtra) {
        await deleteIngredientFromGroceries(groceryIngredient._id);
      }
    });
  };

  const handleAddGroceryListToPantry = async () => {
    setUpdateNeeded(true);

    removeGroceryExtrasFromList();

    const checkedGroceryIngredients = groceryList.data.filter(
      (groceryIngredient) => groceryIngredient.checked,
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const groceryIngredient of checkedGroceryIngredients) {
      const foundIngredient = props.pantry.find(
        (ingredient) => ingredient.name.toUpperCase() === groceryIngredient.name.toUpperCase(),
      );

      if (foundIngredient) {
        /* Convert grocery ingredient quantity to pantry quantity using
           the convertUnits function because quantity types could be
           different between grocery list and pantry */
        const oldQuantityType = groceryIngredient.quantityType;
        const newQuantityType = foundIngredient.quantityType;
        const { quantity } = groceryIngredient;

        let newQuantity = parseFloat(
          convertUnits(quantity, oldQuantityType, newQuantityType),
        );
        /* Once the grocery ingredient quantity is converted, add existing
           pantry quantity to value prior to updating pantry */
        newQuantity += foundIngredient.quantity;

        if (Number.isNaN(newQuantity)) {
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

    setUpdateNeeded(false);

    // Show alert that complete shopping trip function succeeded
    setGroceryComplete(true);
  };

  const handleOpenConfirmDialog = () => {
    setConfirmTripDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmTripDialog(false);
  };

  const reloadGroceryList = async () => {
    await props.getUserPayload();
  };

  if (!props.isLoggedIn) {
    return <Redirect to="/login" />;
  } if (!groceryList || !props.firstName || updateNeeded) {
    return <Loader />;
  }
  return (
    <Container component="main" maxWidth="xs">
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
                    _.toLower(ingredient.quantityType),
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
                        groceryIngredient
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
                  onClick={handleOpenConfirmDialog}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Complete Shopping Trip
                </Button>
                <Dialog
                  open={confirmTripDialog}
                  onClose={handleCloseConfirmDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Complete Shopping Trip?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      This will remove all extras from your shopping list and
                      complete your shopping trip. Are you sure?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleAddGroceryListToPantry}
                      color="primary"
                    >
                      Complete Trip
                    </Button>
                    <Button
                      onClick={handleCloseConfirmDialog}
                      color="primary"
                      autoFocus
                    >
                      Still Shopping
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={groceryComplete}
                  onClose={reloadGroceryList}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Shopping Trip Completed!
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      The checked off grocery list ingredients, which are not
                      extras, have been added to your pantry.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={reloadGroceryList} color="primary">
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
            name="Groceries"
            groceryListAdd
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

export default GroceryList;
