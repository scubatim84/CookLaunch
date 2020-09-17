const validator = require('validator');
const isEmpty = require('is-empty');

interface LoginInputData {
  email: String;
  password: String;
}

// noinspection DuplicatedCode
module.exports = async function validateLoginInput(data: LoginInputData) {
  let error;

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Email checks
  if (validator.isEmpty(data.email)) {
    error = 'Email field is required';
  } else if (!validator.isEmail(data.email)) {
    error = 'Email is invalid';
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    error = 'Password field is required';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
