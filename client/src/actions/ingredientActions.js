import axios from 'axios';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';

// Get ingredients
export const getIngredients = async () => {
  try {
    const token = cookies.get('user');
    return await axios.get('/api/ingredients/', {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    return err.response.data;
  }
};

// Add ingredient
export const addIngredient = async (ingredientData) => {
  let error;

  let { name } = ingredientData;
  let { createdBy } = ingredientData;

  // Check to see if values are empty, and if so, convert them to empty strings
  name = !isEmpty(name) ? name : '';
  createdBy = !isEmpty(createdBy) ? createdBy : '';

  // Check for valid ingredient name
  if (isEmpty(name)) {
    error = 'Please enter an ingredient name.';
  }

  // Check for valid created by ID
  if (isEmpty(createdBy)) {
    error = 'An error has occurred. Please try again.';
  }

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  }
  try {
    const token = cookies.get('user');
    return await axios.post('/api/ingredients/', ingredientData, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    return err.response.data;
  }
};

// Update ingredient
export const updateIngredient = async (ingredientData) => {
  let error;

  let { name } = ingredientData;

  // Check to see if values are empty, and if so, convert them to empty strings
  name = !isEmpty(name) ? name : '';

  // Check for valid name
  if (isEmpty(name)) {
    error = 'Please enter an ingredient name.';
  }

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  }
  try {
    const token = cookies.get('user');
    return await axios.put(
      `/api/ingredients/${ingredientData.id}`,
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

// Delete ingredient
export const deleteIngredient = async (ingredientId) => {
  let error;

  // Check to see if values are empty, and if so, convert them to empty strings
  const idToValidate = !isEmpty(ingredientId) ? ingredientId : '';

  // Check for valid ingredient ID
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
    return await axios.delete(`/api/ingredients/${ingredientId}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    return err.response.data;
  }
};
