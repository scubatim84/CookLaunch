require('dotenv').config();
const express = require('express');
const router = express.Router();
const isEmpty = require('is-empty');

// Load User model
const User = require('../../models/User');

// @route GET api/users/pantry
// @desc Obtain ingredients in user's pantry
// @access Private
router.get('/', async (req, res) => {
  // Find user with email passed in from front end
  const foundUser = await User.findOne({email: req.query.email});

  // Once user is found, send contents of user's pantry
  if (foundUser) {
    try {
      res.status(200).send({
        message: 'success',
        payload: foundUser.pantry,
      });
    } catch (err) {
      res.status(400).send('An error has occurred. ' + err);
    }
  } else {
    res.status(404).send('No user found in database.');
  }
});

// @route POST api/users/pantry
// @desc Add ingredients to user's pantry
// @access Private
router.post('/', async (req, res) => {
  // Find user with email passed in from front end
  const foundUser = await User.findOne({email: req.body.email});

  // Once user is found, add ingredients to user's pantry
  // To greatly reduce number of API calls, req.body.ingredients is an array of ingredients
  if (foundUser) {
    try {
      foundUser.pantry.push(req.body.ingredient);

      await foundUser.save();

      res.status(201).send({
        message: 'success',
        payload: foundUser.pantry,
      });
    } catch (err) {
      res.status(400).send('An error has occurred. ' + err);
    }
  } else {
    res.status(404).send('No user found in database.');
  }
});

// @route PUT api/users/pantry
// @desc Update ingredients in user's pantry
// @access Private
router.put('/', async (req, res) => {
  // Find user with email passed in from front end
  const foundUser = await User.findOne({email: req.body.email});
  const updatedIngredient = req.body.ingredient;

  // Once user is found, update ingredients in user's pantry
  if (foundUser) {
    try {
      const currentIngredient = foundUser.pantry.id(updatedIngredient.id);

      if (!isEmpty(updatedIngredient.quantity)) {
        currentIngredient.quantity = updatedIngredient.quantity;
      }

      if (!isEmpty(updatedIngredient.quantityType)) {
        currentIngredient.quantityType = updatedIngredient.quantityType;
      }

      foundUser.save();

      res.status(200).send({
        message: 'success',
        payload: foundUser.pantry,
      });
    } catch (err) {
      res.status(400).send('An error has occurred. ' + err);
    }
  } else {
    res.status(404).send('No user found in database.');
  }
});

// @route DELETE api/users/pantry
// @desc Delete ingredients from user's pantry
// @access Private
router.delete('/', async (req, res) => {
  // Find user with email passed in from front end
  const foundUser = await User.findOne({email: req.body.email});

  // Once user is found, delete ingredients from user's pantry
  if (foundUser) {
    try {
      foundUser.pantry.remove(req.body.id);
      foundUser.save();

      res.status(200).send('success');
    } catch (err) {
      res.status(400).send('An error has occurred. ' + err);
    }
  } else {
    res.status(404).send('No user found in database.');
  }
});

module.exports = router;
