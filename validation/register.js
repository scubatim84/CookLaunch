import validator from 'validator';
import isEmpty from 'is-empty';

const validateRegisterInput = async (data) => {
  let response = {
    error: '',
    isValid: false,
  };

  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Input checks
  if (validator.isEmpty(data.firstName)) {
    response.error = 'First name field is required';
  } else if (validator.isEmpty(data.lastName)) {
    response.error = 'Last name field is required';
  } else if (validator.isEmpty(data.email)) {
    response.error = 'Email field is required';
  } else if (!validator.isEmail(data.email)) {
    response.error = 'Email is invalid';
  } else if (validator.isEmpty(data.password)) {
    response.error = 'Password field is required';
  } else if (validator.isEmpty(data.password2)) {
    response.error = 'Confirm password field is required';
  } else if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    response.error = 'Password must be 6 to 30 characters long';
  } else if (!validator.equals(data.password, data.password2)) {
    response.error = 'Passwords must match';
  } else {
    response.isValid = true;
  }

  return response;
};

export default validateRegisterInput;
