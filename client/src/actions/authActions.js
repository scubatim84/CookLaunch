import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = async (userData, history) => {
	try {
		const response = await axios.post("/api/users/register", userData);

		if (response.status === 201) {
			return { 
				authResponseType: "success",
				authResponsePayload: response.data
			};
		} else {
			return {
				authResponseType: "fail",
				authResponsePayload: response.data
			};
		}
	} catch (err) {
		return {
			authResponseType: "fail",
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

		// Set current user
		const payload = setCurrentUser(decoded);

		console.log(payload);
		
		// Return user payload
		return {
			authResponseType: "success",
			authResponsePayload: payload
		};
	} catch (err) {
		console.log(err.response.data);
		
		return {
			authResponseType: "fail",
			authResponsePayload: err.response.data
		};
	}
};

// Set logged in user
export const setCurrentUser = decoded => {
  return { payload: decoded };
};

// Log user out
export const logoutUser = () => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  setCurrentUser({});
};