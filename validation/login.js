import validator from 'validator';
import isEmpty from 'is-empty';

const validateLoginInput = async (data) => {
  const response = {
    error: '',
    isValid: false,
  };

  // Convert empty fields to an empty string so we can use validator functions
  const dataToValidate = {
    email: !isEmpty(data.email) ? data.email : '',
    password: !isEmpty(data.password) ? data.password : '',
  };

  // Input checks
  if (validator.isEmpty(dataToValidate.email)) {
    response.error = 'Email field is required';
  } else if (!validator.isEmail(dataToValidate.email)) {
    response.error = 'Email is invalid';
  } else if (validator.isEmpty(dataToValidate.password)) {
    response.error = 'Password field is required';
  } else {
    response.isValid = true;
  }

  return response;
};

export default validateLoginInput;
