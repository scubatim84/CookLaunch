import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import {
  Card, Container, Grid, List,
} from '@material-ui/core';
import {
  addIngredientToPantry,
  deleteIngredientFromPantry,
  updateIngredientInPantry,
} from '../actions/pantryActions';
import IngredientAdd from './Ingredients/IngredientAdd';
import IngredientItem from './Ingredients/IngredientItem';
import useStylesMain from '../Styles';
import { themeMain } from '../Theme';
import CardTitle from './CardTitle';
import Loader from './Loader';

function Pantry(props) {
  const classes = useStylesMain(themeMain);

  const [pantry, setPantry] = useState(null);

  useEffect(() => {
    if (props.pantry && props.pantry.length > 0) {
      const rawPantryList = props.pantry;
      const sortedPantry = rawPantryList.sort((a, b) => a.name.localeCompare(b.name));

      setPantry({ data: sortedPantry });
    } else if (props.pantry) {
      setPantry({ data: [] });
    }
  }, [props.pantry]);

  const handleDelete = async (ingredientId) => {
    const response = await deleteIngredientFromPantry(ingredientId);

    if (response.status === 204) {
      // Update user payload to re-render pantry
      return props.getUserPayload();
    }

    // If request failed, return error message to child component
    return response.data;
  };

  const handleUpdateIngredient = async (updateIngredient) => {
    const response = await updateIngredientInPantry(updateIngredient);

    if (response.status === 204) {
      // Update user payload to re-render pantry
      return props.getUserPayload();
    }

    // If request failed, return error message to child component
    return response.data;
  };

  const handleAddIngredient = async (addIngredient) => {
    const response = await addIngredientToPantry(addIngredient);

    if (response.status === 201) {
      // Update user payload to re-render pantry
      return props.getUserPayload();
    }

    return response.data;
  };

  if (!props.isLoggedIn) {
    return <Redirect to="/login" />;
  } if (!pantry || !props.firstName) {
    return <Loader />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={1} className={classes.pageMarginBottom}>
        <Grid item xs={12}>
          <Card>
            <div className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                  <CardTitle title={`${props.firstName}'s Pantry`} />
                </Grid>
                <Grid item xs={12}>
                  <List className={classes.list}>
                    {pantry
                        && pantry.data.map((ingredient) => {
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
                                key={
                                  ingredient.name + ingredient.dateLastChanged
                                }
                                id={ingredient._id}
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
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <IngredientAdd
            key={props.pantry}
            name="Pantry"
            pantry={props.pantry}
            ingredients={props.ingredients}
            handleAddIngredient={handleAddIngredient}
            handleUpdateIngredient={handleUpdateIngredient}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Pantry;
