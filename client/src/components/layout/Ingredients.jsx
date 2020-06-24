import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {getUserData} from '../../actions/authActions';
import {getIngredients} from '../../actions/ingredientActions';

import {List, ListItem, ListItemText} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Ingredients(props) {
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(props.isLoggedIn);
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [ingredients, setIngredients] = useState({});

  useEffect(async () => {
    const ingredientData = await getIngredients();

    setIngredients(ingredientData.authResponsePayload);
  }, []);

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
      };

      getUserPayload();
    }
  }, [isLoggedIn]);

  const createIngredientList = async () => {
    ingredients.map((ingredient, index) => {
      return (
        <ListItem key={index} id={index}>
          <ListItemText primary={ingredient.name} />
        </ListItem>
      );
    });
  };

  return !isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <List>{createIngredientList}</List>
  );
}

export default Ingredients;
