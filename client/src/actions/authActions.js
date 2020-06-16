import axios from "axios";
import jwt_decode from "jwt-decode";
import { REQUEST_SUCCESS, REQUEST_FAIL } from "./types";
import cookies from "js-cookie";
import isEmpty from "is-empty";

// Register User
export const registerUser = async userData => {
	try {
		const response = await axios.post("/api/users/register", userData);

		if (response.status === 201) {
			return { 
				authResponseType: REQUEST_SUCCESS,
				authResponsePayload: response.data
			};
		} else {
			return {
				authResponseType: REQUEST_FAIL,
				authResponsePayload: response.data
			};
		}
	} catch (err) {
		return {
			authResponseType: REQUEST_FAIL,
			authResponsePayload: err.response.data
		};
	}
};

// Login - get user token and set cookie
export const loginUser = async userData => {
	try {
		const response = await axios.post("/api/users/login", userData);

		// Attempt to login user, and if successful, obtain token
		const { token } = response.data;

		// Set authentication cookie with token
		cookies.set("user", token, { expires: 7 });

		// Return response
		return {
			authResponseType: REQUEST_SUCCESS
		};
	} catch (err) {
		return {
			authResponseType: REQUEST_FAIL,
			authResponsePayload: err.response.data
		};
	}
};

// Log user out
export const logoutUser = async () => {
	// Remove authentication cookie
  cookies.remove("user");

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
  const userCookie = cookies.get("user");

  if (!isEmpty(userCookie)) {
    return true;
  } else {
    return false;
  }
}

// Get user data from decoded JWT token
export const getUserData = async token => {
  // Decode token to get user payload
  const decoded = await jwt_decode(token);

  // Set current user to decoded payload
  const payload = { payload: decoded }

  return payload;
}