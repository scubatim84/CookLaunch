import {validateIngredientData} from './validateIngredientData';

test('tests validateIngredientData function when name is missing', () => {
  const sampleIngredient = {
    name: '',
    quantity: 5,
    quantityType: 'Ounces',
  };

  expect(validateIngredientData(sampleIngredient)).toBe(
    'Please enter an ingredient name.'
  );
});

test('tests validateIngredientData function when quantity type is missing', () => {
  const sampleIngredient = {
    name: 'Red Onion',
    quantity: 5,
    quantityType: '',
  };

  expect(validateIngredientData(sampleIngredient)).toBe(
    'Please enter a quantity type.'
  );
});

test('tests validateIngredientData function when quantity is missing', () => {
  const sampleIngredient = {
    name: 'Red Onion',
    quantity: '',
    quantityType: 'Ounces',
  };

  expect(validateIngredientData(sampleIngredient)).toBe(
    'Please enter a quantity.'
  );
});
