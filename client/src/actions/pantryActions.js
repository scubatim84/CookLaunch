import axios from 'axios';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';

import validateIngredientData from './validateIngredientData';

// Add ingredient to pantry
export const addIngredientToPantry = async (ingredientData) => {
  const error = validateIngredientData(ingredientData);

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  }
  try {
    const token = cookies.get('user');
    return await axios.post('/api/pantry', ingredientData, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    return err.response.data;
  }
};

// Update ingredient in pantry
export const updateIngredientInPantry = async (ingredientData) => {
  const error = validateIngredientData(ingredientData);

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  }
  try {
    const token = cookies.get('user');
    return await axios.put(
      `/api/pantry/${ingredientData.id}`,
      ingredientData,
      {
        headers: {
          Authorization: token,
        },
      },
    );
  } catch (err) {
    return err.response.data;
  }
};

// Delete ingredient from pantry
export const deleteIngredientFromPantry = async (ingredientId) => {
  let error;

  // Check to see if values are empty, and if so, convert them to empty strings
  const idToValidate = !isEmpty(ingredientId) ? ingredientId : '';

  // Check for valid ingredient name
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
    return await axios.delete(`/api/pantry/${ingredientId}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    return err.response.data;
  }
};
