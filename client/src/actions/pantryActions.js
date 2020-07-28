import axios from 'axios';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';

const validateIngredientData = (ingredientData) => {
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

  return error;
};

// Add ingredient to pantry
export const addIngredientToPantry = async (ingredientData) => {
  const error = validateIngredientData(ingredientData);

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  } else {
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
  }
};

// Update ingredient in pantry
export const updateIngredientInPantry = async (ingredientData) => {
  const error = validateIngredientData(ingredientData);

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  } else {
    try {
      const token = cookies.get('user');
      return await axios.put(
        `/api/pantry/${ingredientData.id}`,
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

// Delete ingredient from pantry
export const deleteIngredientFromPantry = async (ingredientName) => {
  let error;

  // Check to see if values are empty, and if so, convert them to empty strings
  ingredientName = !isEmpty(ingredientName) ? ingredientName : '';

  // Check for valid ingredient name
  if (isEmpty(ingredientName)) {
    error = 'An error has occurred. Please try again.';
  }

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  } else {
    try {
      const token = cookies.get('user');
      return await axios.delete(`/api/pantry/${ingredientName}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (err) {
      return err.response.data;
    }
  }
};
