import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import isEmpty from 'is-empty';
import _ from 'lodash';
import {REQUEST_SUCCESS} from '../../actions/types';
import {getUserData} from '../../actions/authActions';
import {
  addIngredientToDatabase,
  getIngredients,
} from '../../actions/ingredientActions';

import FormSubmitMessage from '../layout/FormSubmitMessage';

import {
  Button,
  Card,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
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
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 250,
    margin: theme.spacing(1, 0, 2),
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

  const ingredientList = ingredients.map((ingredient, index) => {
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

  const handleSelect = async (e) => {
    const value = e.target.value;

    setAddIngredient((prevValue) => {
      return {
        ...prevValue,
        quantityType: value,
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
        quantityType: '',
        createdBy: user.email,
      });

      // If adding ingredient is successful, clear old errors
      setError({
        errorMessage: '',
      });

      // Update ingredient list
      getIngredientData();
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
                <FormControl className={classes.formControl}>
                  <InputLabel id='quantityTypeLabel'>Quantity Type</InputLabel>
                  <Select
                    labelId='quantityType'
                    id='quantityType'
                    required
                    fullWidth
                    value={addIngredient.quantityType}
                    onChange={handleSelect}
                  >
                    <MenuItem value={'Ounces'}>Ounces</MenuItem>
                    <MenuItem value={'Grams'}>Grams</MenuItem>
                    <MenuItem value={'Liters'}>Liters</MenuItem>
                  </Select>
                </FormControl>
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
