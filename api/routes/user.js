import express from 'express';
import isEmpty from 'is-empty';

// Load User model
import User from '../../models/User';

// Set up Express router
const router = express.Router();

// @route GET api/user/profile
// @desc Obtain user profile
// @access Private
router.get('/profile', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, send user data
  if (foundUser) {
    try {
      res.status(200).json(foundUser);
    } catch (err) {
      res.status(500).json(`An error has occurred. ${err}`);
    }
  } else {
    res.status(500).json('No user found in database.');
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

      return res.status(200).json(foundUser);
    } catch (err) {
      return res.status(500).send(`An error has occurred. ${err}`);
    }
  } else {
    return res.status(500).json('User not found');
  }
});

// @route DELETE api/user/:id
// @desc Delete user by ID
// @access Private
router.delete('/:id', async (req, res) => {
  // Obtain user from request to verify token
  const foundUser = req.user;

  // Once user is verified, delete user
  if (foundUser) {
    try {
      const deletedUser = await User.deleteOne({
        _id: req.params.id,
      });

      if (deletedUser.deletedCount === 1) {
        res.status(204).json(null);
      } else {
        res.status(400).json('User deletion failed.');
      }
    } catch (err) {
      res.status(500).json(`An error has occurred. ${err}`);
    }
  } else {
    res.status(500).json('No user found in database.');
  }
});

export default router;
