import React from 'react';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';
import {deleteIngredientFromPantry} from '../../actions/pantryActions';
import PantryAdd from './PantryAdd';
import PantryItem from './PantryItem';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {Card, Container, Grid, Typography} from '@material-ui/core';

function Pantry(props) {
  const classes = useStylesForm(themeMain);

  const handleDelete = async (ingredientId) => {
    await deleteIngredientFromPantry(ingredientId);

    // Update user payload to re-render pantry
    await props.getUserPayload();
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
                  <PantryItem
                    key={index}
                    id={ingredient._id}
                    name={formatName}
                    quantity={ingredient.quantity}
                    quantityType={formatQuantityType}
                    handleDelete={handleDelete}
                    getUserPayload={props.getUserPayload}
                  />
                );
              })}
            </Grid>
          </Grid>
        </div>
      </Card>
      <PantryAdd
        key={props.pantry}
        ingredients={props.ingredients}
        getUserPayload={props.getUserPayload}
      />
    </Container>
  );
}

export default Pantry;
