import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import isEmpty from "is-empty";

// Register User
export const registerUser = (userData, history) => {
	let error = "";

	axios
		.post("/api/users/register", userData)
		// .then(res => history.push("/login")) // re-direct to login on successful register
		.then(res => {
			if (isEmpty(error) && res.status === 200) {
				console.log("User registered.");
			}
		})
		.catch(err => {
			error = err.response.data;
		}).bind(error);

	console.log(error);
	

	// If an error occurs during registration, it will be returned
	if (!isEmpty(error)) {
		return error;
	} 
};

// Login - get user token
export const loginUser = userData => {
	axios
		.post("/api/users/login", userData)
		.then(res => {
			// Save to localStorage
			// Set token to localStorage
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user payload
			const decoded = jwt_decode(token);
			// Set current user
			setCurrentUser(decoded);
		})
		.catch(err => {
			// error = err.response.data;
		});
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