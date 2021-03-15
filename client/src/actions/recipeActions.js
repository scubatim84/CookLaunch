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

  let { name } = recipeData;
  const { ingredients } = recipeData;

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
  }
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
};

// Get one recipe from back end if created by user
export const getOneRecipe = async (recipeId) => {
  let error;

  // Check to see if values are empty, and if so, convert them to empty strings
  const idToValidate = !isEmpty(recipeId) ? recipeId : '';

  // Check for valid recipe ID
  if (isEmpty(idToValidate)) {
    error = 'An error has occurred. Please try again.';
  }

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  }
  try {
    const token = cookies.get('user');
    return await axios.get(`/api/recipes/${recipeId}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    return err;
  }
};

// Update recipe
export const updateRecipe = async (recipeData) => {
  let error;

  let { name } = recipeData;
  let { ingredients } = recipeData;

  // Check to see if values are empty, and if so, convert them to empty strings
  name = !isEmpty(name) ? name : '';
  ingredients = !isEmpty(ingredients) ? ingredients : [];

  // Check for valid name
  if (isEmpty(name)) {
    error = 'Please enter a name.';
  }

  // Check for valid ingredients
  if (isEmpty(ingredients)) {
    error = 'Please add one or more ingredients.';
  }

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  }
  try {
    const token = cookies.get('user');
    return await axios.put(`/api/recipes/${recipeData._id}`, recipeData, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    return err.response.data;
  }
};

// Delete recipe
export const deleteRecipe = async (recipeId) => {
  let error;

  // Check to see if values are empty, and if so, convert them to empty strings
  const idToValidate = !isEmpty(recipeId) ? recipeId : '';

  // Check for valid recipe ID
  if (isEmpty(idToValidate)) {
    error = 'An error has occurred. Please try again.';
  }

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  }
  try {
    const token = cookies.get('user');
    return await axios.delete(`/api/recipes/${recipeId}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    return err.response.data;
  }
};
