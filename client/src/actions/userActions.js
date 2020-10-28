import axios from 'axios';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';

// Get user profile
export const getUserData = async () => {
  try {
    const token = cookies.get('user');
    return await axios.get('/api/user/profile', {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    return err.response;
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  let error;

  let firstName = userData.firstName;
  let lastName = userData.lastName;
  let email = userData.email;

  // Check to see if values are empty, and if so, convert them to empty strings
  firstName = !isEmpty(firstName) ? firstName : '';
  lastName = !isEmpty(lastName) ? lastName : '';
  email = !isEmpty(email) ? email : '';

  // Check for valid first name
  if (isEmpty(firstName)) {
    error = 'Please enter a first name.';
  }

  // Check for valid last name
  if (isEmpty(lastName)) {
    error = 'Please enter a last name.';
  }

  // Check for valid email
  if (isEmpty(email)) {
    error = 'Please enter an email.';
  }

  if (!isEmpty(error)) {
    return {
      data: error,
    };
  } else {
    try {
      const token = cookies.get('user');
      return await axios.put('/api/user/profile', userData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (err) {
      return err.response;
    }
  }
};
