require('dotenv').config();
const express = require('express');
const router = express.Router();
const isEmpty = require('is-empty');

// @route GET api/user/profile
// @desc Obtain user profile
// @access Private
router.get('/profile', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, send user data
  if (foundUser) {
    try {
      res.status(200).send({
        message: 'success',
        payload: foundUser,
      });
    } catch (err) {
      res.status(400).send('An error has occurred. ' + err);
    }
  } else {
    res.status(404).send('No user found in database.');
  }
});

// @route PUT api/user/profile
// @desc Update user profile
// @access Private
router.put('/profile', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, update profile
  if (foundUser) {
    try {
      if (!isEmpty(req.body.firstName)) {
        foundUser.firstName = req.body.firstName;
      }

      if (!isEmpty(req.body.lastName)) {
        foundUser.lastName = req.body.lastName;
      }

      if (!isEmpty(req.body.email)) {
        foundUser.email = req.body.email;
      }

      await foundUser.save();

      res.status(200).json(foundUser);
    } catch (err) {
      res.status(400).send('An error has occurred. ' + err);
    }
  } else {
    return res.status(404).json('User not found');
  }
});

module.exports = router;
