import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import isEmpty from 'is-empty';
import _ from 'lodash';
import {REQUEST_SUCCESS} from '../actions/types';
import {getUserData} from '../actions/authActions';
import {
  addIngredientToDatabase,
  getIngredients,
} from '../actions/ingredientActions';
import {useStylesForm} from '../Styles';
import {themeMain} from '../Theme';

import FormSubmitMessage from './FormSubmitMessage';

import {
  Button,
  Card,
  Container,
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';

function Ingredients(props) {
  const classes = useStylesForm(themeMain);

  const [isLoggedIn, setLoggedIn] = useState(props.isLoggedIn);
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState({
    errorMessage: '',
  });
  const [ingredients, setIngredients] = useState({data: []});
  const [addIngredient, setAddIngredient] = useState({
    name: '',
    createdBy: user.email,
  });

  const getIngredientData = async () => {
    const response = await getIngredients();

    setIngredients({data: response.authResponsePayload});
  };

  useEffect(() => {
    getIngredientData();
  }, [user]);

  useEffect(() => {
    setLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const getUserPayload = async () => {
        const data = await getUserData();
        const userPayload = await data.payload;

        setUser({
          email: userPayload.email,
          firstName: userPayload.firstName,
          lastName: userPayload.lastName,
        });

        setAddIngredient((prevValue) => {
          return {
            ...prevValue,
            createdBy: userPayload.email,
          };
        });
      };

      getUserPayload();
    }
  }, [isLoggedIn]);

  const ingredientList = ingredients.data.map((ingredient, index) => {
    const formatName = _.startCase(_.toLower(ingredient.name));

    return (
      <ListItem dense={true} alignItems='flex-start' key={index} id={index}>
        <ListItemText primary={formatName} />
      </ListItem>
    );
  });

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setAddIngredient((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestResponse = await addIngredientToDatabase(addIngredient);

    if (requestResponse.authResponseType === REQUEST_SUCCESS) {
      // If adding ingredient is successful, clear form
      setAddIngredient({
        name: '',
        createdBy: user.email,
      });

      // If adding ingredient is successful, clear old errors
      setError({
        errorMessage: '',
      });

      // Update ingredient list
      await getIngredientData();
    } else {
      setError({
        errorMessage: requestResponse.authResponsePayload,
      });
    }
  };

  return !isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Container component='main' maxWidth='xs'>
      <Card className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Ingredients For Recipes
          </Typography>
          <List className={classes.list}>{ingredientList}</List>
          <form className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={addIngredient.name}
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

export default Ingredients;
