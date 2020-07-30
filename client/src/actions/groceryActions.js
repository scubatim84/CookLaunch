import axios from 'axios';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';
import {validateIngredientData} from './validateIngredientData';

// Add ingredient to grocery list
export const addIngredientToGroceries = async (ingredientData) => {
  const error = validateIngredientData(ingredientData);

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  } else {
    try {
      const token = cookies.get('user');
      return await axios.post('/api/groceries', ingredientData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (err) {
      return err.response.data;
    }
  }
};

// Update ingredient in grocery list
export const updateIngredientInGroceries = async (ingredientData) => {
  const error = validateIngredientData(ingredientData);

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  } else {
    try {
      const token = cookies.get('user');
      return await axios.put(
        `/api/groceries/${ingredientData.id}`,
        ingredientData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (err) {
      return err.response.data;
    }
  }
};

// Delete ingredient from grocery list
export const deleteIngredientFromGroceries = async (ingredientId) => {
  let error;

  // Check to see if values are empty, and if so, convert them to empty strings
  ingredientId = !isEmpty(ingredientId) ? ingredientId : '';

  // Check for valid ingredient ID
  if (isEmpty(ingredientId)) {
    error = 'An error has occurred. Please try again.';
  }

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  } else {
    try {
      const token = cookies.get('user');
      return await axios.delete(`/api/groceries/${ingredientId}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (err) {
      return err.response.data;
    }
  }
};
