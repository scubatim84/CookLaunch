import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';
import isEmpty from 'is-empty';
import {REQUEST_SUCCESS} from '../../actions/types';
import {getUserData} from '../../actions/authActions';
import {
  addIngredientToPantry,
  getPantry,
  deleteIngredientFromPantry,
} from '../../actions/pantryActions';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';

import PantryItem from '../layout/PantryItem';
import FormSubmitMessage from '../layout/FormSubmitMessage';

import {
  Card,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from '@material-ui/core';

function Pantry(props) {
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
  const [pantry, setPantry] = useState({data: [{name: 'None'}]});
  const [addIngredient, setAddIngredient] = useState({
    name: '',
    quantity: '',
    quantityType: '',
  });

  const getPantryData = async () => {
    const response = await getPantry(user.email);

    if (response.authResponseType === REQUEST_SUCCESS) {
      setPantry({data: response.authResponsePayload});
    }
  };

  useEffect(() => {
    getPantryData(user.email);
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

        setPantry({
          data: userPayload.pantry,
        });
      };

      getUserPayload();
    }
  }, [isLoggedIn]);

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

    const requestResponse = await addIngredientToPantry(addIngredient);

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
      await getPantryData();
    } else {
      setError({
        errorMessage: requestResponse.authResponsePayload,
      });
    }
  };

  const handleDelete = async (userEmail, ingredientId) => {
    await deleteIngredientFromPantry(userEmail, ingredientId);

    // Update pantry data to re-render
    await getPantryData();
  };

  return !isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Container component='main' maxWidth='sm'>
      <Card className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} align='center'>
              <Typography component='h1' variant='h5'>
                {user.firstName}'s Pantry
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {pantry.data.map((ingredient, index) => {
                const formatName = _.startCase(_.toLower(ingredient.name));
                const formatQuantityType = _.startCase(
                  _.toLower(ingredient.quantityType)
                );

                return (
                  <PantryItem
                    key={index}
                    id={ingredient._id}
                    name={formatName}
                    userEmail={user.email}
                    quantityType={formatQuantityType}
                    quantity={ingredient.quantity}
                    handleDelete={handleDelete}
                    updatePantry={getPantryData}
                  />
                );
              })}
            </Grid>
            <Grid item xs={12}>
              {!isEmpty(error.errorMessage) && (
                <FormSubmitMessage submitMessage={error.errorMessage} />
              )}
            </Grid>
          </Grid>
        </div>
      </Card>
    </Container>
  );
}

export default Pantry;
