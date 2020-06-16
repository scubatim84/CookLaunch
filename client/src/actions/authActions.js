import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { REQUEST_SUCCESS, REQUEST_FAIL } from "./types";

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

// Login - get user token
export const loginUser = async userData => {
	try {
		const response = await axios.post("/api/users/login", userData);

		// Save to localStorage
		// Set token to localStorage
		const { token } = response.data;
		localStorage.setItem("jwtToken", token);

		// Set token to Auth header
		setAuthToken(token);

		// Decode token to get user payload
		const decoded = jwt_decode(token);

		// Set current user to be logged in
		const payload = { payload: decoded }

		// Return user payload
		return {
			authResponseType: REQUEST_SUCCESS,
			authResponsePayload: payload
		};
	} catch (err) {
		return {
			authResponseType: REQUEST_FAIL,
			authResponsePayload: err.response.data
		};
	}
};

// Log user out
export const logoutUser = user => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  // setCurrentUser({});
};