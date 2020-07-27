import axios from 'axios';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';

// Add ingredient to grocery list
export const addIngredientToGroceries = async (ingredientData) => {
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
  let error;

  console.log(ingredientData);

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
