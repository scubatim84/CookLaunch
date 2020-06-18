const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
	// Form validation
	const { error, isValid } = await validateRegisterInput(req.body);

	//Check validation
	if (!isValid) {
		return res.status(400).json(error);
	}

	// Check whether user already exists
	const foundUser = await User.findOne({ email: req.body.email });

	// If user exists, return error, otherwise create new user
	if (foundUser) {
		return res.status(400).json("Email already exists");
	} else {
		const newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
		});

		// Hash password before saving in database
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, (err, hash) => {
				if (err) throw err;

				newUser.password = hash;
				newUser.save();

				try {
					res.status(201).json(newUser)
				} catch(err) {
					console.log(err);
				}
			});
		});
	}
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async (req, res) => {
	// Form validation
	const { error, isValid } = await validateLoginInput(req.body);
	
	// Check validation
  if (!isValid) {
    return res.status(400).json(error);
	}
	
	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	const foundUser = await User.findOne({ email });

	// Check if user exists
	if (!foundUser) {
		return res.status(404).json("Email not found" );
	}

	// Check password
	const isMatch = await bcrypt.compare(password, foundUser.password);

	if (isMatch) {
		// User matched
		// Create JWT Payload
		const payload = {
			id: foundUser.id,
			firstName: foundUser.firstName,
			lastName: foundUser.lastName,
		};

		//Sign token
		jwt.sign(
			payload,
			process.env.SECRET_OR_KEY,
			{
				expiresIn: 31556926 // 1 year in seconds
			},
			(err, jwtToken) => {
				res.status(200).json({
					success: true,
					token: "Bearer " + jwtToken
				});
			}
		);
	} else {
		return res.status(400).json("Password incorrect" );
	}
});

module.exports = router;