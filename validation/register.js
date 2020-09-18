import validator from 'validator';
import isEmpty from 'is-empty';

const validateRegisterInput = async (data) => {
  let error;

  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Name checks
  if (validator.isEmpty(data.firstName)) {
    error = 'First name field is required';
  }
  if (validator.isEmpty(data.lastName)) {
    error = 'Last name field is required';
  }

  //Email checks
  if (validator.isEmpty(data.email)) {
    error = 'Email field is required';
  } else if (!validator.isEmail(data.email)) {
    error = 'Email is invalid';
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    error = 'Password field is required';
  }

  if (validator.isEmpty(data.password2)) {
    error = 'Confirm password field is required';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    error = 'Password must be at least 6 characters';
  }

  if (!validator.equals(data.password, data.password2)) {
    error = 'Passwords must match';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateRegisterInput;
