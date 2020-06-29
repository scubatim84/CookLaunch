import axios from 'axios';
import isEmpty from 'is-empty';
import validator from 'validator';
import {REQUEST_SUCCESS, REQUEST_FAIL} from './types';

// Get ingredients from back end
export const getIngredients = async () => {
  try {
    const response = await axios.get('/api/ingredients/');

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

// Add ingredient to database
export const addIngredientToDatabase = async (ingredientData) => {
  let error;

  let name = ingredientData.name;
  let createdBy = ingredientData.createdBy;

  // Check to see if values are empty, and if so, convert them to empty strings
  name = !isEmpty(name) ? name : '';
  createdBy = !isEmpty(createdBy) ? createdBy : '';

  // CreatedBy check for valid E-mail
  if (isEmpty(createdBy)) {
    error = 'An error has occurred. Please try again.';
  } else if (!validator.isEmail(createdBy)) {
    error = 'An error has occurred. Please try again.';
  }

  // Check for valid ingredient name
  if (isEmpty(name)) {
    error = 'Please enter an ingredient name.';
  }

  if (!isEmpty(error)) {
    return {
      authResponseType: REQUEST_FAIL,
      authResponsePayload: error,
    };
  } else {
    try {
      const response = await axios.post('/api/ingredients/', ingredientData);

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
