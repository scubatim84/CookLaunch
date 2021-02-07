import validator from 'validator';
import isEmpty from 'is-empty';

const validateLoginInput = async (data) => {
  let response = {
    error: '',
    isValid: false,
  };

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Input checks
  if (validator.isEmpty(data.email)) {
    response.error = 'Email field is required';
  } else if (!validator.isEmail(data.email)) {
    response.error = 'Email is invalid';
  } else if (validator.isEmpty(data.password)) {
    response.error = 'Password field is required';
  } else {
    response.isValid = true;
  }

  return response;
};

export default validateLoginInput;
