import { convert_units } from '../../actions/unitConversions';
import { ingredientQuantityTypes } from '../../actions/types';

it('tests conversion when units are the same', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Cups'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Cups'
  );

  expect(convert_units(5, quantityTypeFrom, quantityTypeTo)).toEqual(5);
});

it('tests cups to liters conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Cups'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Liters'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(0.24);
});

it('tests cups to ounces conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Cups'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Ounces'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(8);
});

it('tests grams to ounces conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Grams'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Ounces'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(0.035274);
});

it('tests liters to cups conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Liters'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Cups'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(4.22675);
});

it('tests ounces to cups conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Ounces'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Cups'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(0.125);
});

it('tests ounces to grams conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Ounces'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Grams'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(28.3495);
});

it('tests ounces to pounds conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Ounces'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Pounds'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(0.0625);
});

it('tests ounces to tablespoons conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Ounces'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Tbsps'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(2);
});

it('tests ounces to teaspoons conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Ounces'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Tsps'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(6);
});

it('tests ounces to pints conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Ounces'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Pints'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(0.0625);
});

it('tests pounds to ounces conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Pounds'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Ounces'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(16);
});

it('tests pints to ounces conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Pints'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Ounces'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(16);
});

it('tests pounds to grams conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Pounds'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Grams'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(453.592);
});

it('tests tablespoons to ounces conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Tbsps'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Ounces'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(0.5);
});

it('tests teaspoons to ounces conversion', () => {
  const quantityTypeFrom = ingredientQuantityTypes.find(
    (type) => type === 'Tsps'
  );
  const quantityTypeTo = ingredientQuantityTypes.find(
    (type) => type === 'Ounces'
  );

  expect(convert_units(1, quantityTypeFrom, quantityTypeTo)).toEqual(0.166667);
});
