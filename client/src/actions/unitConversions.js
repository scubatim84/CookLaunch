let conversionAmounts = new Map();

conversionAmounts['CupsToLiters'] = 0.24;
conversionAmounts['CupsToOunces'] = 8;
conversionAmounts['GramsToOunces'] = 0.035274;
conversionAmounts['LitersToCups'] = 4.22675;
conversionAmounts['OuncesToCups'] = 0.125;
conversionAmounts['OuncesToGrams'] = 28.3495;
conversionAmounts['OuncesToPounds'] = 0.0625;
conversionAmounts['OuncesToTbsps'] = 2;
conversionAmounts['OuncesToTsps'] = 6;
conversionAmounts['OuncesToPints'] = 0.0625;
conversionAmounts['PoundsToOunces'] = 16;
conversionAmounts['PintsToOunces'] = 16;
conversionAmounts['PoundsToGrams'] = 453.592;
conversionAmounts['TbspsToOunces'] = 0.5;
conversionAmounts['TspsToOunces'] = 0.166667;

export const convert_units = (quantity, type_one, type_two) => {
  if (type_one === type_two) {
    return quantity;
  } else {
    const convertKey = `${type_one}To${type_two}`;

    return conversionAmounts[convertKey] * quantity.toFixed(2);
  }
};
