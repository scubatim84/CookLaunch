import axios from 'axios';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';
import {REQUEST_SUCCESS, REQUEST_FAIL} from './types';

// Get pantry from back end
export const getPantry = async () => {
  try {
    const token = cookies.get('user');
    const response = await axios.get('/api/pantry', {
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

// Add ingredient to pantry
export const addIngredientToPantry = async (ingredientData) => {
  let error;

  let name = ingredientData.name;
  let quantity = ingredientData.quantity;
  let quantityType = ingredientData.quantityType;

  // Check to see if values are empty, and if so, convert them to empty strings
  name = !isEmpty(name) ? name : '';
  quantity = !isEmpty(quantity) ? quantity : '';
  quantityType = !isEmpty(quantityType) ? quantityType : '';

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
      // Create payload
      const payload = {
        name: name,
        quantity: quantity,
        quantityType: quantityType,
      };

      const token = cookies.get('user');
      const response = await axios.post('/api/pantry', payload, {
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

// Update ingredient in pantry
export const updateIngredientInPantry = async (ingredientData) => {
  let error;

  let quantity = ingredientData.quantity;
  let quantityType = ingredientData.quantityType;

  // Check to see if values are empty, and if so, convert them to empty strings
  quantity = !isEmpty(quantity) ? quantity : '';
  quantityType = !isEmpty(quantityType) ? quantityType : '';

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
      const token = cookies.get('user');
      const response = await axios.put('/api/pantry', ingredientData, {
        headers: {
          Authorization: token,
        },
      });

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
export const deleteIngredientFromPantry = async (ingredientId) => {
  let error;

  // Check to see if values are empty, and if so, convert them to empty strings
  ingredientId = !isEmpty(ingredientId) ? ingredientId : '';

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
      const token = cookies.get('user');
      const response = await axios.delete('/api/pantry', {
        headers: {
          Authorization: token,
        },
        data: {
          id: ingredientId,
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
