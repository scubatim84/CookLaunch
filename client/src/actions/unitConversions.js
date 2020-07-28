let conversionAmounts = new Map();

conversionAmounts['CupsToLiters'] = 0.236588;
conversionAmounts['CupsToOunces'] = 8;
conversionAmounts['GramsToOunces'] = 0.035274;
conversionAmounts['LitersToCups'] = 4.22675;
conversionAmounts['OuncesToCups'] = 0.125;
conversionAmounts['OuncesToGrams'] = 28.3495;
conversionAmounts['OuncesToPounds'] = 0.0625;
conversionAmounts['PoundsToOunces'] = 16;
conversionAmounts['PoundsToGrams'] = 453.592;

export const convert_units = (quantity, type_one, type_two) => {
  if (type_one === type_two) {
    return quantity;
  } else {
    const convertKey = `${type_one}To${type_two}`;

    return (conversionAmounts[convertKey] * quantity).toFixed(2);
  }
};
