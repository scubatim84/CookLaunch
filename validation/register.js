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
    error === undefined ? (error = 'First name field is required') : '';
  }
  if (validator.isEmpty(data.lastName)) {
    error === undefined ? (error = 'Last name field is required') : '';
  }

  //Email checks
  if (validator.isEmpty(data.email)) {
    error === undefined ? (error = 'Email field is required') : '';
  } else if (!validator.isEmail(data.email)) {
    error === undefined ? (error = 'Email is invalid') : '';
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    error === undefined ? (error = 'Password field is required') : '';
  }

  if (validator.isEmpty(data.password2)) {
    error === undefined ? (error = 'Confirm password field is required') : '';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    error === undefined
      ? (error = 'Password must be 6 to 30 characters long')
      : '';
  }

  if (!validator.equals(data.password, data.password2)) {
    error === undefined ? (error = 'Passwords must match') : '';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateRegisterInput;
