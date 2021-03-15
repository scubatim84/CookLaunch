const conversionAmounts = new Map();

conversionAmounts.CupsToLiters = 0.24;
conversionAmounts.CupsToOunces = 8;
conversionAmounts.GramsToOunces = 0.035274;
conversionAmounts.LitersToCups = 4.22675;
conversionAmounts.OuncesToCups = 0.125;
conversionAmounts.OuncesToGrams = 28.3495;
conversionAmounts.OuncesToPounds = 0.0625;
conversionAmounts.OuncesToTbsps = 2;
conversionAmounts.OuncesToTsps = 6;
conversionAmounts.OuncesToPints = 0.0625;
conversionAmounts.PoundsToOunces = 16;
conversionAmounts.PintsToOunces = 16;
conversionAmounts.PoundsToGrams = 453.592;
conversionAmounts.TbspsToOunces = 0.5;
conversionAmounts.TspsToOunces = 0.166667;

const convertUnits = (quantity, typeOne, typeTwo) => {
  if (typeOne === typeTwo) {
    return Number(quantity);
  }

  const convertKey = `${typeOne}To${typeTwo}`;

  return conversionAmounts[convertKey] * Number(quantity).toFixed(10);
};

export default convertUnits;
