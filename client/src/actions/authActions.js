import axios from "axios";
import jwt_decode from "jwt-decode";
import { REQUEST_SUCCESS, REQUEST_FAIL } from "./types";
import cookies from "js-cookie";

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

// Log user out and remove cookie
export const logoutUser = () => {
	// Remove authentication cookie
	cookies.remove("user");
};