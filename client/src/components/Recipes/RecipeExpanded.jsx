import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {Button, Card, Grid, Link, List} from '@material-ui/core';
import {useStylesForm, useStylesMain} from '../../Styles';
import {themeMain} from '../../Theme';
import {getOneRecipe} from '../../actions/recipeActions';
import _ from 'lodash';
import RecipeIngredientView from './RecipeIngredientView';
import RecipeName from './RecipeName';
import CardTitle from '../CardTitle';

function RecipeExpanded(props) {
  const classes = useStylesForm(themeMain);
  const mainClasses = useStylesMain(themeMain);

  const recipeId = useParams().id;

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
  });

  useEffect(() => {
    const getRecipeData = async () => {
      const recipeData = await getOneRecipe(recipeId);

      setRecipe(recipeData.data);
    };

    getRecipeData();
  }, [recipeId]);

  return !props.isLoggedIn ? (
    <Redirect to='/login' />
  ) : (
    <Grid container>
      <Grid item xs={12}>
        <Grid item xs={12} sm={2}>
          <Link href={'/'} color='textPrimary' style={{textDecoration: 'none'}}>
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
        <Card className={classes.root}>
          <div className={classes.paper}>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} align='center'>
                  <RecipeName
                    key={recipe.name + new Date()}
                    name={recipe.name}
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
                          key={ingredient.id}
                          id={ingredient.id}
                          name={formatName}
                          quantity={ingredient.quantity}
                          quantityType={formatQuantityType}
                        />
                      );
                    })}
                  </List>
                </Grid>
              </Grid>
            </form>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RecipeExpanded;
