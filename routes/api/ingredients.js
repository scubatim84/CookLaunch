const express = require('express');
const isEmpty = require('is-empty');
const router = express.Router();
const _ = require('lodash');

// Load Ingredient model
const {Ingredient} = require('../../models/Ingredient');

// @route GET api/ingredients
// @desc Get all ingredients
// @access Private
router.get('/', async (req, res) => {
  try {
    const foundIngredients = await Ingredient.find({});

    if (foundIngredients) {
      res.status(200).json({
        message: 'success',
        payload: foundIngredients,
      });
    } else {
      res.status(404).json('fail');
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// @route POST api/ingredients
// @desc Add new ingredient
// @access Private
router.post('/', async (req, res) => {
  try {
    const ingredientName = _.lowerCase(req.body.name);
    const createdByEmail = req.body.createdBy;

    const foundIngredient = await Ingredient.findOne({name: ingredientName});

    if (foundIngredient) {
      res.status(400).json('That ingredient already exists.');
    }

    const newIngredient = new Ingredient({
      name: ingredientName,
      createdBy: createdByEmail,
    });

    if (!foundIngredient) {
      const createdIngredient = await newIngredient.save();

      res.status(201).json(createdIngredient);
    }
  } catch (err) {
    console.log(err);

    res.status(400).json(err);
  }
});

// @route GET api/ingredients/:name
// @desc Get one ingredient by name
// @access Private
router.get('/:name', async (req, res) => {
  try {
    const ingredientName = _.lowerCase(req.params.name);

    const foundIngredient = await Ingredient.findOne({name: ingredientName});

    res.status(200).json(foundIngredient);
  } catch (err) {
    res.status(404).json(err);
  }
});

// @route PUT api/ingredients/:name
// @desc Update one ingredient by name
// @access Private
router.put('/:name', async (req, res) => {
  try {
    const ingredientName = _.lowerCase(req.params.name);
    const foundIngredient = await Ingredient.findOne({name: ingredientName});

    if (!isEmpty(req.body.name)) {
      const newName = _.lowerCase(req.body.name);

      foundIngredient.name = newName;
    }

    await foundIngredient.save();

    res.status(200).json(foundIngredient);
  } catch (err) {
    res.status(204).json(err);
  }
});

// @route DELETE api/ingredients/:name
// @desc Delete one ingredient by name
// @access Private
router.delete('/:name', async (req, res) => {
  try {
    const ingredientName = _.lowerCase(req.params.name);

    await Ingredient.deleteOne({name: ingredientName});

    res.status(200).json('success');
  } catch (err) {
    res.status(204).json(err);
  }
});

module.exports = router;
