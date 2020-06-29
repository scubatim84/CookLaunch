import axios from 'axios';
import isEmpty from 'is-empty';
import validator from 'validator';
import {REQUEST_SUCCESS, REQUEST_FAIL} from './types';

// Get pantry from back end
export const getPantry = async () => {
  try {
    const response = await axios.get('/api/users/pantry');

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

// Add ingredient to pantry
export const addIngredientToPantry = async (ingredientData) => {
  let error;

  let name = ingredientData.name;
  let quantity = ingredientData.quantity;
  let quantityType = ingredientData.quantityType;
  let createdBy = ingredientData.createdBy;

  // Check to see if values are empty, and if so, convert them to empty strings
  name = !isEmpty(name) ? name : '';
  quantity = !isEmpty(quantity) ? quantity : '';
  quantityType = !isEmpty(quantityType) ? quantityType : '';
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

  // Check for valid quantity
  if (isEmpty(quantity)) {
    error = 'Please enter a quantity.';
  }

  // Check for valid quantity type
  if (isEmpty(quantityType)) {
    error = 'Please enter a quantity type.';
  }

  if (!isEmpty(error)) {
    return {
      authResponseType: REQUEST_FAIL,
      authResponsePayload: error,
    };
  } else {
    try {
      const response = await axios.post('/api/users/pantry', ingredientData);

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
