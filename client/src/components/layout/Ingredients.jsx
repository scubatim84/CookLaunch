import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import isEmpty from 'is-empty';
import {getUserData} from '../../actions/authActions';
import {getIngredients} from '../../actions/ingredientActions';

import FormSubmitMessage from '../layout/FormSubmitMessage';

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

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(2),
  },
  list: {
    margin: theme.spacing(0, 0, 0),
  },
  paper: {
    margin: theme.spacing(2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
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
  const [error, setError] = useState({
    errorMessage: '',
  });
  const [ingredients, setIngredients] = useState([]);
  const [addIngredient, setAddIngredient] = useState({
    name: '',
    quantityType: '',
    createdBy: user.email,
  });

  const getIngredientData = async () => {
    const response = await getIngredients();

    setIngredients(response.authResponsePayload);
  };

  useEffect(() => {
    getIngredientData();
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

  const ingredientList = ingredients.map((ingredient, index) => {
    return (
      <ListItem key={index} id={index}>
        <ListItemText primary={ingredient.name} />
      </ListItem>
    );
  });

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Placeholder
  };

  return !isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Container component='main' maxWidth='xs'>
      <Card className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Ingredients
          </Typography>
          <List className={classes.list}>{ingredientList}</List>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
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
                <TextField
                  onChange={handleChange}
                  value={user.password}
                  variant='outlined'
                  required
                  fullWidth
                  name='quantityType'
                  label='Quantity Type'
                  id='quantityType'
                  autoComplete='quantityType'
                />
              </Grid>
            </Grid>
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
