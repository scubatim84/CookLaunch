import axios from 'axios';
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
