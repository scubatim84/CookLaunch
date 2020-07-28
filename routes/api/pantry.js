require('dotenv').config();
const express = require('express');
const router = express.Router();

// @route GET api/pantry
// @desc Obtain ingredients in user's pantry
// @access Private
router.get('/', (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, send contents of user's pantry
  if (foundUser) {
    try {
      res.status(200).json({
        message: 'success',
        payload: foundUser.pantry,
      });
    } catch (err) {
      res.status(400).json('An error has occurred. ' + err);
    }
  } else {
    res.status(404).json('No user found in database.');
  }
});

// @route POST api/pantry
// @desc Add ingredients to user's pantry
// @access Private
router.post('/', (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user value is obtained, add ingredients to user's pantry
  if (foundUser) {
    try {
      foundUser.pantry.push(req.body);

      foundUser.save();

      res.status(201).json({
        message: 'success',
        payload: foundUser.pantry,
      });
    } catch (err) {
      res.status(400).json('An error has occurred. ' + err);
    }
  } else {
    res.status(404).json('No user found in database.');
  }
});

// @route PUT api/pantry/:name
// @desc Update ingredient in user's pantry by name
// @access Private
router.put('/:name', (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is obtained, update ingredients in user's pantry
  if (foundUser) {
    try {
      const updatedIngredient = {
        name: req.body.name,
        quantity: req.body.quantity,
        quantityType: req.body.quantityType,
      };

      const foundIngredient = foundUser.pantry.id(req.body.id);
      foundIngredient.set(updatedIngredient);

      foundUser.save();

      res.status(204).json(null);
    } catch (err) {
      res.status(400).json('An error has occurred. ' + err);
    }
  } else {
    res.status(400).json('No user found in database.');
  }
});

// @route DELETE api/pantry/:name
// @desc Delete ingredient from user's pantry by name
// @access Private
router.delete('/:name', (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, delete ingredients from user's pantry
  if (foundUser) {
    try {
      foundUser.pantry.remove(req.params.name);
      foundUser.save();

      res.status(204).json(null);
    } catch (err) {
      res.status(400).json('An error has occurred. ' + err);
    }
  } else {
    res.status(400).json('No user found in database.');
  }
});

module.exports = router;
