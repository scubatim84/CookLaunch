import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  EMAIL_NOT_FOUND,
  RECOVERY_EMAIL_SENT,
  REQUEST_FAIL,
  REQUEST_SUCCESS,
} from './types';
import cookies from 'js-cookie';
import isEmpty from 'is-empty';
import validator from 'validator';

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/api/auth/register', userData);

    if (response.status === 201) {
      return {
        authResponseType: REQUEST_SUCCESS,
        authResponsePayload: response.data,
      };
    } else {
      return {
        authResponseType: REQUEST_FAIL,
        authResponsePayload: response.data,
      };
    }
  } catch (err) {
    return {
      authResponseType: REQUEST_FAIL,
      authResponsePayload: err.response.data,
    };
  }
};

// Login - get user token and set cookie
export const loginUser = async (userData) => {
  try {
    const response = await axios.post('/api/auth/login', userData);

    // Attempt to login user, and if successful, obtain token
    const {token} = response.data;

    // Set authentication cookie with token
    cookies.set('user', token, {expires: 7});

    // Return response
    return {
      authResponseType: REQUEST_SUCCESS,
    };
  } catch (err) {
    return {
      authResponseType: REQUEST_FAIL,
      authResponsePayload: err.response.data,
    };
  }
};

// Log user out
export const logoutUser = async () => {
  // Remove authentication cookie
  cookies.remove('user');

  // Check authentication to ensure user logout was successful
  const userAuthenticated = await authenticateUser();

  if (!userAuthenticated) {
    return REQUEST_SUCCESS;
  } else {
    return REQUEST_FAIL;
  }
};

// Check if user is logged in
export const authenticateUser = async () => {
  const userCookie = cookies.get('user');

  return !isEmpty(userCookie);
};

// Get user data from decoded JWT token
export const getUserToken = async () => {
  // Retrieve token
  const token = cookies.get('user');

  // Decode token to get user payload
  const decoded = await jwtDecode(token);

  // Return decoded payload
  return {payload: decoded};
};

// Send password reset E-mail from forgot password form
export const sendPasswordResetEmail = async (userEmail) => {
  let error;

  // Check to see if email submitted is empty, and if so, convert to empty string
  userEmail = !isEmpty(userEmail) ? userEmail : '';

  // Email check
  if (validator.isEmpty(userEmail)) {
    error = 'Email field is required';
  } else if (!validator.isEmail(userEmail)) {
    error = 'Email is invalid';
  }

  if (!isEmpty(error)) {
    return {
      authResponseType: REQUEST_FAIL,
      authResponsePayload: error,
    };
  } else {
    try {
      const response = await axios.post('/api/auth/forgotpassword', {
        email: userEmail,
      });

      if (response.data === EMAIL_NOT_FOUND) {
        return {
          authResponseType: REQUEST_FAIL,
          authResponsePayload: EMAIL_NOT_FOUND,
        };
      } else if (response.data === RECOVERY_EMAIL_SENT) {
        return {
          authResponseType: REQUEST_SUCCESS,
          authResponsePayload: RECOVERY_EMAIL_SENT,
        };
      }
    } catch (err) {
      return {
        authResponseType: REQUEST_FAIL,
        authResponsePayload: isEmpty(err.response.data)
          ? 'An error has occurred. Please try again.'
          : err.response.data,
      };
    }
  }
};

// Validate reset password token from forgot password email
export const checkResetPasswordToken = async (token) => {
  let error;

  // Check to see if token is empty, and if so, convert to empty string
  token = !isEmpty(token) ? token : '';

  // Token check
  if (isEmpty(token)) {
    error = 'An error has occurred. Please try again.';
  }

  if (!isEmpty(error)) {
    return {
      authResponseType: REQUEST_FAIL,
      authResponsePayload: error,
    };
  }

  try {
    const response = await axios.get('/api/auth/validateresetpasswordtoken', {
      params: {
        resetPasswordToken: token,
      },
    });

    if (response.data.message === REQUEST_SUCCESS) {
      return {
        authResponseType: REQUEST_SUCCESS,
        authResponsePayload: response.data,
      };
    } else {
      return {
        authResponseType: REQUEST_FAIL,
        authResponsePayload: response.data,
      };
    }
  } catch (err) {
    return {
      authResponseType: REQUEST_FAIL,
      authResponsePayload: 'The password link has expired or is invalid.',
    };
  }
};

// Reset password using email to look up user and new password
export const resetPassword = async (userData) => {
  let error;

  // Check to see if parameters are empty, and if so, convert to empty string
  userData.email = !isEmpty(userData.email) ? userData.email : '';
  userData.password = !isEmpty(userData.password) ? userData.password : '';

  // Email checks
  if (validator.isEmpty(userData.email)) {
    error = 'Email field is required';
  } else if (!validator.isEmail(userData.email)) {
    error = 'Email is invalid';
  }

  // Password checks
  if (validator.isEmpty(userData.password)) {
    error = 'Password field is required';
  }

  if (!isEmpty(error)) {
    return {
      authResponseType: REQUEST_FAIL,
      authResponsePayload: error,
    };
  }

  try {
    const response = await axios.put('/api/auth/resetpassword', userData);

    if (response.data === REQUEST_SUCCESS) {
      return {
        authResponseType: REQUEST_SUCCESS,
        authResponsePayload: response.data,
      };
    } else {
      return {
        authResponseType: REQUEST_FAIL,
        authResponsePayload: response.data,
      };
    }
  } catch (err) {
    return {
      authResponseType: REQUEST_FAIL,
      authResponsePayload: isEmpty(err.response.data)
        ? 'An error has occurred. Please try again.'
        : err.response.data,
    };
  }
};

// Check password against confirm password to verify if same or not
export const validatePassword = async (password, password2) => {
  let error;

  password = !isEmpty(password) ? password : '';
  password2 = !isEmpty(password2) ? password2 : '';

  // Password checks
  if (validator.isEmpty(password)) {
    error = 'Password field is required';
  }

  if (validator.isEmpty(password2)) {
    error = 'Confirm password field is required';
  }

  if (!validator.isLength(password, {min: 6, max: 30})) {
    error = 'Password must be at least 6 characters';
  }

  if (!validator.equals(password, password2)) {
    error = 'Passwords must match';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
