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
} from '@material-ui/core';
import IngredientNameItem from './IngredientNameItem';
import CardTitle from '../CardTitle';

function IngredientNames(props) {
  const classes = useStylesForm(themeMain);

  const [ingredientList, setIngredientList] = useState({data: []});
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

      setIngredientList({data: sortedIngredients});
    }
  }, [props.id, props.ingredients]);

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

    const foundIngredient = props.pantry.find(
      (pantryIngredient) => pantryIngredient.name === ingredient.name
    );
    let requestResponse;

    if (foundIngredient) {
      setError({
        errorMessage: 'That ingredient already exists.',
      });
    } else {
      requestResponse = await addIngredient(ingredient);

      if (requestResponse.authResponseType === REQUEST_SUCCESS) {
        // If adding ingredient is successful, re-render ingredient list
        props.getIngredientData();
      } else {
        setError({
          errorMessage: requestResponse.authResponsePayload,
        });
      }
    }
  };

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <Card className={classes.root}>
          <div className={classes.paper}>
            <CardTitle title='Ingredients For Recipes' />
            <List className={classes.list}>
              {ingredientList.data.map((ingredient) => {
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
}

export default IngredientNames;
