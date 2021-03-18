import convertUnits from '../../actions/unitConversions';
import { ingredientQuantityTypes } from '../../actions/types';

it('tests conversion when units are the same', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Cups',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Cups',
  );

  expect(convertUnits(5, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(5);
});

it('tests cups to liters conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Cups',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Liters',
  );

  expect(convertUnits(2, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(0.48);
});

it('tests cups to ounces conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Cups',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Ounces',
  );

  expect(convertUnits(4, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(32);
});

it('tests grams to ounces conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Grams',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Ounces',
  );

  expect(convertUnits(15, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(
    0.52911,
  );
});

it('tests liters to cups conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Liters',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Cups',
  );

  expect(convertUnits(3, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(
    12.68025,
  );
});

it('tests ounces to cups conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Ounces',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Cups',
  );

  expect(convertUnits(4, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(0.5);
});

it('tests ounces to grams conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Ounces',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Grams',
  );

  expect(convertUnits(5, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(
    141.7475,
  );
});

it('tests ounces to pounds conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Ounces',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Pounds',
  );

  expect(convertUnits(6, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(0.375);
});

it('tests ounces to tablespoons conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Ounces',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Tbsps',
  );

  expect(convertUnits(5, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(10);
});

it('tests ounces to teaspoons conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Ounces',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Tsps',
  );

  expect(convertUnits(6, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(36);
});

it('tests ounces to pints conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Ounces',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Pints',
  );

  expect(convertUnits(6, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(0.375);
});

it('tests pounds to ounces conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Pounds',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Ounces',
  );

  expect(convertUnits(3, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(48);
});

it('tests pints to ounces conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Pints',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Ounces',
  );

  expect(convertUnits(4, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(64);
});

it('tests pounds to grams conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Pounds',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Grams',
  );

  expect(convertUnits(3, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(
    1360.776,
  );
});

it('tests tablespoons to ounces conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Tbsps',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Ounces',
  );

  expect(convertUnits(3, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(1.5);
});

it('tests teaspoons to ounces conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Tsps',
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Ounces',
  );

  expect(convertUnits(5, quantityTypeFrom, quantityTypeTo)).toBeCloseTo(
    0.833335,
  );
});
