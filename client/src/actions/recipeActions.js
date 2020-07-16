import axios from 'axios';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';

// Get all recipes from back end created by user
export const getAllRecipes = async () => {
  try {
    const token = cookies.get('user');
    return await axios.get('/api/recipes/', {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    return err;
  }
};

// Add recipe
export const addRecipe = async (recipeData) => {
  let error;

  let name = recipeData.name;
  let ingredients = recipeData.ingredients;

  // Check to see if values are empty, and if so, convert them to empty strings
  name = !isEmpty(name) ? name : '';

  // Check for valid recipe name
  if (isEmpty(name)) {
    error = 'Please enter a recipe name.';
  }

  // Check for valid list of ingredients
  if (isEmpty(ingredients)) {
    error = 'Please add one or more ingredients.';
  }

  if (!isEmpty(error)) {
    return error;
  } else {
    try {
      const token = cookies.get('user');
      return await axios.post('/api/recipes/', recipeData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (err) {
      return err.response.data;
    }
  }
};
