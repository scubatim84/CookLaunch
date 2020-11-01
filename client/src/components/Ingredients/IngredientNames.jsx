import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import isEmpty from 'is-empty';
import _ from 'lodash';
import FormSubmitMessage from '../FormSubmitMessage';
import {
  addIngredient,
  deleteIngredient,
} from '../../actions/ingredientActions';
import { useStylesMain } from '../../Styles';
import { themeMain } from '../../Theme';
import {
  Button,
  Card,
  Container,
  Grid,
  List,
  TextField,
} from '@material-ui/core';
import IngredientNameItem from './IngredientNameItem';
import CardTitle from '../CardTitle';
import Loader from '../Loader';

function IngredientNames(props) {
  const classes = useStylesMain(themeMain);

  const [ingredientList, setIngredientList] = useState(null);
  const [ingredient, setIngredient] = useState({
    name: '',
    createdBy: '',
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    setIngredient((prevValue) => {
      return {
        ...prevValue,
        createdBy: props.id,
      };
    });

    if (props.ingredients && props.ingredients.length > 0) {
      let rawIngredientList = props.ingredients;
      let sortedIngredients = rawIngredientList.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      setIngredientList({ data: sortedIngredients });
    } else if (props.ingredients) {
      setIngredientList({ data: [] });
    }
  }, [props.id, props.ingredients]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setIngredient((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleDelete = async (ingredientId) => {
    await deleteIngredient(ingredientId);

    // Update ingredient list to re-render ingredients
    await props.getIngredientData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foundIngredient = props.pantry.find(
      (pantryIngredient) => pantryIngredient.name === ingredient.name
    );

    if (foundIngredient) {
      setError({
        errorMessage: 'That ingredient already exists.',
      });
    } else {
      const response = await addIngredient(ingredient);

      if (response.status === 201) {
        // If adding ingredient is successful, re-render ingredient list
        props.getIngredientData();
      } else {
        setError({
          errorMessage: response.data,
        });
      }
    }
  };

  const ingredientDialog = {
    title: 'Delete ingredient?',
    text:
      'This action cannot be reversed. Are you sure you want to delete this ingredient?',
    leftButtonLabel: 'Delete',
    rightButtonLabel: 'Cancel',
  };

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else if (!ingredientList || !props.id) {
    return <Loader />;
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <Card>
          <Grid className={classes.paper}>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} align='center'>
                  <CardTitle title='Ingredients For Recipes' />
                </Grid>
                <List className={classes.list}>
                  {ingredientList.data.map((ingredient) => {
                    const formatName = _.startCase(_.toLower(ingredient.name));

                    return (
                      <Grid
                        item
                        xs={12}
                        key={ingredient.name + ingredient.dateLastChanged}
                      >
                        <IngredientNameItem
                          key={ingredient.name + ingredient.dateLastChanged}
                          createdBy={ingredient.createdBy}
                          userId={props.id}
                          id={ingredient._id}
                          name={formatName}
                          getIngredientData={props.getIngredientData}
                          handleDelete={handleDelete}
                          ingredientDialog={ingredientDialog}
                        />
                      </Grid>
                    );
                  })}
                </List>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    value={ingredient.name}
                    variant='outlined'
                    required
                    fullWidth
                    id='name'
                    label='Ingredient Name'
                    name='name'
                    autoComplete='name'
                  />
                </Grid>
                <Grid item xs={12} align='center'>
                  <Button
                    onClick={handleSubmit}
                    fullWidth
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    Add Ingredient
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {!isEmpty(error.errorMessage) && (
                    <FormSubmitMessage submitMessage={error.errorMessage} />
                  )}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Container>
    );
  }
}

export default IngredientNames;
