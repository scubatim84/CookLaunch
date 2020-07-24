let conversionAmounts = new Map();

conversionAmounts['OuncesToPounds'] = 0.0625;
conversionAmounts['PoundsToOunces'] = 16;
conversionAmounts['GramsToOunces'] = 0.035274;
conversionAmounts['OuncesToGrams'] = 28.3495;
conversionAmounts['CupsToOunces'] = 8;
conversionAmounts['OuncesToCups'] = 0.125;
conversionAmounts['LitersToCups'] = 4.22675;
conversionAmounts['CupsToLiters'] = 0.236588;

export const convert_units = async (quantity, type_one, type_two) => {
  const convertKey = `${type_one}To${type_two}`;

  return conversionAmounts[convertKey] * quantity;
};
