const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
	let errors = []

	// Convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.push("Email field is required");
	} else if (!Validator.isEmail(data.email)) {
		errors.push("Email is invalid");
	}

	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.push("Password field is required");
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};