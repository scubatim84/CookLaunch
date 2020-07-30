import isEmpty from 'is-empty';

export const validateIngredientData = (ingredientData) => {
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
