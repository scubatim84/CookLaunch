import axios from 'axios';
import isEmpty from 'is-empty';
import validator from 'validator';
import {REQUEST_SUCCESS, REQUEST_FAIL} from './types';

// Get pantry from back end
export const getPantry = async (userEmail) => {
  try {
    const response = await axios.get(`/api/pantry?email=${userEmail}`);

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
export const addIngredientToPantry = async (userEmail, ingredientData) => {
  let error;

  let name = ingredientData.name;
  let quantity = ingredientData.quantity;
  let quantityType = ingredientData.quantityType;

  // Check to see if values are empty, and if so, convert them to empty strings
  name = !isEmpty(name) ? name : '';
  quantity = !isEmpty(quantity) ? quantity : '';
  quantityType = !isEmpty(quantityType) ? quantityType : '';
  userEmail = !isEmpty(userEmail) ? userEmail : '';

  // CreatedBy check for valid E-mail
  if (isEmpty(userEmail)) {
    error = 'An error has occurred. Please try again.';
  } else if (!validator.isEmail(userEmail)) {
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
    const payload = {
      email: userEmail,
      ingredient: ingredientData,
    };

    try {
      const response = await axios.post('/api/pantry', payload);

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

// Update ingredient in pantry
export const updateIngredientInPantry = async (userEmail, ingredientData) => {
  let error;

  let quantity = ingredientData.quantity;
  let quantityType = ingredientData.quantityType;

  // Check to see if values are empty, and if so, convert them to empty strings
  quantity = !isEmpty(quantity) ? quantity : '';
  quantityType = !isEmpty(quantityType) ? quantityType : '';
  userEmail = !isEmpty(userEmail) ? userEmail : '';

  // CreatedBy check for valid E-mail
  if (isEmpty(userEmail)) {
    error = 'An error has occurred. Please try again.';
  } else if (!validator.isEmail(userEmail)) {
    error = 'An error has occurred. Please try again.';
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
      const payload = {
        email: userEmail,
        ingredient: ingredientData,
      };
      const response = await axios.put('/api/pantry', payload);

      if (response.status === 200) {
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

// Delete ingredient from pantry
export const deleteIngredientFromPantry = async (userEmail, ingredientId) => {
  let error;

  // Check to see if values are empty, and if so, convert them to empty strings
  userEmail = !isEmpty(userEmail) ? userEmail : '';
  ingredientId = !isEmpty(ingredientId) ? ingredientId : '';

  // CreatedBy check for valid E-mail
  if (isEmpty(userEmail)) {
    error = 'An error has occurred. Please try again.';
  } else if (!validator.isEmail(userEmail)) {
    error = 'An error has occurred. Please try again.';
  }

  // Check for valid ingredient ID
  if (isEmpty(ingredientId)) {
    error = 'An error has occurred. Please try again.';
  }

  if (!isEmpty(error)) {
    return {
      authResponseType: REQUEST_FAIL,
      authResponsePayload: error,
    };
  } else {
    try {
      const payload = {
        email: userEmail,
        id: ingredientId,
      };

      const response = await axios.delete('/api/pantry', {data: payload});

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
