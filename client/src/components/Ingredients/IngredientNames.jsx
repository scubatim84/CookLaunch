import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import isEmpty from 'is-empty';
import _ from 'lodash';
import FormSubmitMessage from '../FormSubmitMessage';
import {REQUEST_SUCCESS} from '../../actions/types';
import {addIngredient, deleteIngredient} from '../../actions/ingredientActions';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {
  Button,
  Card,
  Container,
  Grid,
  List,
  TextField,
  Typography,
} from '@material-ui/core';
import IngredientNameItem from './IngredientNameItem';

function IngredientNames(props) {
  const classes = useStylesForm(themeMain);

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
  }, [props.id]);

  const handleChange = async (e) => {
    const {name, value} = e.target;

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

    const requestResponse = await addIngredient(ingredient);

    if (requestResponse.authResponseType === REQUEST_SUCCESS) {
      // If adding ingredient is successful, re-render ingredient list
      props.getIngredientData();
    } else {
      setError({
        errorMessage: requestResponse.authResponsePayload,
      });
    }
  };

  return !props.isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Container component='main' maxWidth='xs'>
      <Card className={classes.root}>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Ingredients For Recipes
          </Typography>
          <List className={classes.list}>
            {props.ingredients.map((ingredient) => {
              const formatName = _.startCase(_.toLower(ingredient.name));

              return (
                <IngredientNameItem
                  key={ingredient.name}
                  createdBy={ingredient.createdBy}
                  userId={props.id}
                  id={ingredient._id}
                  name={formatName}
                  getIngredientData={props.getIngredientData}
                  handleDelete={handleDelete}
                />
              );
            })}
          </List>
          <form className={classes.form} noValidate>
            <Grid container spacing={3}>
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
              <Grid item xs={12}>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Add Ingredient
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {!isEmpty(error.errorMessage) && (
                <FormSubmitMessage submitMessage={error.errorMessage} />
              )}
            </Grid>
          </form>
        </div>
      </Card>
    </Container>
  );
}

export default IngredientNames;
