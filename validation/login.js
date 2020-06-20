const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = async function validateLoginInput(data) {
  let error;

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Email checks
  if (Validator.isEmpty(data.email)) {
    error = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    error = 'Email is invalid';
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    error = 'Password field is required';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
