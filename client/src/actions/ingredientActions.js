import axios from 'axios';
import isEmpty from 'is-empty';
import {REQUEST_SUCCESS, REQUEST_FAIL} from './types';
import cookies from 'js-cookie';

// Get ingredients
export const getIngredients = async () => {
  try {
    const token = cookies.get('user');
    const response = await axios.get('/api/ingredients/', {
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

// Add ingredient
export const addIngredient = async (ingredientData) => {
  let error;

  let name = ingredientData.name;
  let createdBy = ingredientData.createdBy;

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
  } else {
    try {
      const token = cookies.get('user');
      const response = await axios.post('/api/ingredients/', ingredientData, {
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

// Update ingredient
export const updateIngredient = async (ingredientData) => {
  let error;

  let name = ingredientData.name;

  // Check to see if values are empty, and if so, convert them to empty strings
  name = !isEmpty(name) ? name : '';

  // Check for valid name
  if (isEmpty(name)) {
    error = 'Please enter a name.';
  }

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  } else {
    try {
      const token = cookies.get('user');
      const response = await axios.put(
        `/api/ingredients/${ingredientData.id}`,
        ingredientData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 204) {
        return {
          authResponseType: REQUEST_SUCCESS,
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

// Delete ingredient
export const deleteIngredient = async (ingredientId) => {
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
      const response = await axios.delete(`/api/ingredients/${ingredientId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 204) {
        return {
          authResponseType: REQUEST_SUCCESS,
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
