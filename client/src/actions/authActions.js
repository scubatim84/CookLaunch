import axios from 'axios';
import cookies from 'js-cookie';
import isEmpty from 'is-empty';
import validator from 'validator';

import { REQUEST_FAIL, REQUEST_SUCCESS } from './types';

// Register User
export const registerUser = async (userData) => {
  try {
    return await axios.post('/api/auth/register', userData);
  } catch (err) {
    return err.response.data;
  }
};

// Login - get user token and set cookie
export const loginUser = async (userData) => {
  try {
    const response = await axios.post('/api/auth/login', userData);

    // Attempt to login user, and if successful, obtain token
    const token = response.data;

    // Set authentication cookie with token
    cookies.set('user', token, { expires: 7 });

    // Return response
    return response;
  } catch (err) {
    return err.response.data;
  }
};

// Log user out
export const logoutUser = async () => {
  // Remove authentication cookie
  cookies.remove('user');

  // Check authentication to ensure user logout was successful
  const userCookie = cookies.get('user');

  if (isEmpty(userCookie)) {
    return REQUEST_SUCCESS;
  }
  return REQUEST_FAIL;
};

// Send password reset E-mail from forgot password form
export const sendPasswordResetEmail = async (userEmail) => {
  let error;

  // Check to see if email submitted is empty, and if so, convert to empty string
  const emailToValidate = !isEmpty(userEmail) ? userEmail : '';

  // Email check
  if (validator.isEmpty(emailToValidate)) {
    error = 'Email field is required';
  } else if (!validator.isEmail(emailToValidate)) {
    error = 'Email is invalid';
  }

  if (!isEmpty(error)) {
    return error;
  }
  try {
    return await axios.post('/api/auth/forgotpassword', {
      email: userEmail,
    });
  } catch (err) {
    return err.response.data;
  }
};

// Validate reset password token from forgot password email
export const checkResetPasswordToken = async (token) => {
  let error;

  // Check to see if token is empty, and if so, convert to empty string
  const tokenToValidate = !isEmpty(token) ? token : '';

  // Token check
  if (isEmpty(tokenToValidate)) {
    error = 'An error has occurred. Please try again.';
  }

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  }

  try {
    return await axios.get('/api/auth/validateresetpasswordtoken', {
      params: {
        resetPasswordToken: token,
      },
    });
  } catch (err) {
    return err.response.data;
  }
};

// Reset password using email to look up user and new password
export const resetPassword = async (userData) => {
  let error;

  // Check to see if parameters are empty, and if so, convert to empty string
  const emailToValidate = !isEmpty(userData.email) ? userData.email : '';
  const passwordToValidate = !isEmpty(userData.password) ? userData.password : '';

  // Email checks
  if (validator.isEmpty(emailToValidate)) {
    error = 'Email field is required';
  } else if (!validator.isEmail(emailToValidate)) {
    error = 'Email is invalid';
  }

  // Password checks
  if (validator.isEmpty(passwordToValidate)) {
    error = 'Password field is required';
  }

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  }

  try {
    return await axios.put('/api/auth/resetpassword', userData);
  } catch (err) {
    return err.response.data;
  }
};

// Check password against confirm password to verify if same or not
export const validatePassword = async (password, confirmPassword) => {
  let error;

  const passwordToValidate = !isEmpty(password) ? password : '';
  const confirmPasswordToValidate = !isEmpty(confirmPassword) ? confirmPassword : '';

  // Password checks
  if (validator.isEmpty(passwordToValidate)) {
    error = 'Password field is required';
  }

  if (!validator.isEmpty(passwordToValidate) && validator.isEmpty(confirmPasswordToValidate)) {
    error = 'Confirm password field is required';
  }

  if (
    !validator.isEmpty(passwordToValidate)
    && !validator.isLength(passwordToValidate, { min: 6, max: 30 })
  ) {
    error = 'Password must be at least 6 characters';
  }

  if (
    !validator.isEmpty(passwordToValidate)
    && !validator.isEmpty(confirmPasswordToValidate)
    && !validator.equals(passwordToValidate, confirmPasswordToValidate)
  ) {
    error = 'Passwords must match';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
