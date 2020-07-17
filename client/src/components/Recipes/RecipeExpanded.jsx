import React, {useEffect, useState} from 'react';
import {Redirect, useHistory, useParams} from 'react-router-dom';
import {Button, Card, Grid, Link, List} from '@material-ui/core';
import {useStylesForm, useStylesMain} from '../../Styles';
import {themeMain} from '../../Theme';
import {
  deleteRecipe,
  getOneRecipe,
  updateRecipe,
} from '../../actions/recipeActions';
import _ from 'lodash';
import RecipeIngredientView from './RecipeIngredientView';
import RecipeName from './RecipeName';
import CardTitle from '../CardTitle';
import RecipeButton from './RecipeButton';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';
import {Delete} from '@material-ui/icons';

function RecipeExpanded(props) {
  const history = useHistory();
  const classes = useStylesForm(themeMain);
  const mainClasses = useStylesMain(themeMain);

  const recipeId = useParams().id;

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [
      {
        id: '',
        name: '',
        quantity: '',
        quantityType: '',
      },
    ],
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    const getOneRecipeData = async () => {
      const recipeData = await getOneRecipe(recipeId);

      setRecipe(recipeData.data);
    };

    getOneRecipeData();
  }, [recipeId]);

  const handleEdit = async () => {
    await setEditMode(true);
  };

  const handleCancel = async () => {
    await setEditMode(false);
  };

  const handleDelete = async () => {
    const response = await deleteRecipe(recipe._id);

    if (response.status === 204) {
      await props.getRecipeData();
      history.push('/dashboard');
    } else {
      setError({
        errorMessage: response,
      });
    }
  };

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setRecipe((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await updateRecipe(recipe);

    if (response.status === 204) {
      await props.getRecipeData();
    } else {
      setError({
        errorMessage: response,
      });
    }
  };

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid item xs={12} sm={2}>
            <Link
              href={'/'}
              color='textPrimary'
              style={{textDecoration: 'none'}}
            >
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={mainClasses.submit}
              >
                Return To Dashboard
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card>
            <div className={classes.paper}>
              <form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} align='center'>
                    <RecipeName
                      name={recipe.name}
                      editMode={editMode}
                      handleChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CardTitle title='Recipe Ingredients' />
                  </Grid>
                  <Grid item xs={12}>
                    <List className={classes.list}>
                      {recipe.ingredients.map((ingredient) => {
                        const formatName = _.startCase(
                          _.toLower(ingredient.name)
                        );
                        const formatQuantityType = _.startCase(
                          _.toLower(ingredient.quantityType)
                        );

                        return (
                          <RecipeIngredientView
                            key={ingredient.name}
                            id={ingredient.id}
                            name={formatName}
                            quantity={ingredient.quantity}
                            quantityType={formatQuantityType}
                          />
                        );
                      })}
                    </List>
                  </Grid>
                  <Grid
                    container
                    justify='space-between'
                    className={classes.form}
                  >
                    <Grid item xs={6}>
                      <RecipeButton
                        key={editMode + new Date()}
                        editMode={editMode}
                        handleEdit={handleEdit}
                        handleCancel={handleCancel}
                        handleSubmit={handleSubmit}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Delete
                        onClick={handleDelete}
                        color='secondary'
                        className='icon'
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {!isEmpty(error.errorMessage) && (
                      <FormSubmitMessage submitMessage={error.errorMessage} />
                    )}
                  </Grid>
                </Grid>
              </form>
            </div>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default RecipeExpanded;
