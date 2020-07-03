require('dotenv').config();
const express = require('express');
const router = express.Router();
const isEmpty = require('is-empty');

// @route GET api/pantry
// @desc Obtain ingredients in user's pantry
// @access Private
router.get('/', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

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

// @route POST api/pantry
// @desc Add ingredients to user's pantry
// @access Private
router.post('/', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user value is obtained, add ingredients to user's pantry
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

// @route PUT api/pantry
// @desc Update ingredients in user's pantry
// @access Private
router.put('/', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;
  const updatedIngredient = req.body.ingredient;

  // Once user is obtained, update ingredients in user's pantry
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

// @route DELETE api/pantry
// @desc Delete ingredients from user's pantry
// @access Private
router.delete('/', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

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
