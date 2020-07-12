import axios from 'axios';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';
import {REQUEST_SUCCESS, REQUEST_FAIL} from './types';

// Get all recipes from back end created by user
export const getAllRecipes = async () => {
  try {
    const token = cookies.get('user');
    const response = await axios.get('/api/recipes/', {
      headers: {
        Authorization: token,
      },
    });

    if (response.data.message === REQUEST_SUCCESS) {
      return {
        authResponseType: REQUEST_SUCCESS,
        authResponsePayload: response.data.payload,
      };
    } else {
      return {
        authResponseType: REQUEST_FAIL,
        authResponsePayload: response.data.message,
      };
    }
  } catch (err) {
    return {
      authResponseType: REQUEST_FAIL,
      authResponsePayload: err,
    };
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
    return {
      authResponseType: REQUEST_FAIL,
      authResponsePayload: error,
    };
  } else {
    try {
      const token = cookies.get('user');
      const response = await axios.post('/api/recipes/', recipeData, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 201) {
        return {
          authResponseType: REQUEST_SUCCESS,
          authResponsePayload: response.data,
        };
      } else {
        return {
          authResponseType: REQUEST_FAIL,
          authResponsePayload: response.data,
        };
      }
    } catch (err) {
      return {
        authResponseType: REQUEST_FAIL,
        authResponsePayload: isEmpty(err.response.data)
          ? 'An error has occurred. Please try again.'
          : err.response.data,
      };
    }
  }
};
