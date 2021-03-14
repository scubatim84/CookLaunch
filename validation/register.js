import validator from 'validator';
import isEmpty from 'is-empty';

const validateRegisterInput = async (data) => {
  const response = {
    error: '',
    isValid: false,
  };

  // Convert empty fields to an empty string so we can use validator functions
  const dataToValidate = {
    firstName: !isEmpty(data.firstName) ? data.firstName : '',
    lastName: !isEmpty(data.lastName) ? data.lastName : '',
    email: !isEmpty(data.email) ? data.email : '',
    password: !isEmpty(data.password) ? data.password : '',
    password2: !isEmpty(data.password2) ? data.password2 : '',
  };

  // Input checks
  if (validator.isEmpty(dataToValidate.firstName)) {
    response.error = 'First name field is required';
  } else if (validator.isEmpty(dataToValidate.lastName)) {
    response.error = 'Last name field is required';
  } else if (validator.isEmpty(dataToValidate.email)) {
    response.error = 'Email field is required';
  } else if (!validator.isEmail(dataToValidate.email)) {
    response.error = 'Email is invalid';
  } else if (validator.isEmpty(dataToValidate.password)) {
    response.error = 'Password field is required';
  } else if (validator.isEmpty(dataToValidate.password2)) {
    response.error = 'Confirm password field is required';
  } else if (!validator.isLength(dataToValidate.password, { min: 6, max: 30 })) {
    response.error = 'Password must be 6 to 30 characters long';
  } else if (!validator.equals(dataToValidate.password, dataToValidate.password2)) {
    response.error = 'Passwords must match';
  } else {
    response.isValid = true;
  }

  return response;
};

export default validateRegisterInput;
