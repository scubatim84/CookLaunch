const express = require('express');
const isEmpty = require('is-empty');
const router = express.Router();
const _ = require('lodash');

// Load Ingredient model
const Ingredient = require('../../models/Ingredient');

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
    }
  } catch (err) {
    if (!foundIngredients) {
      res.status(404).json(err);
    } else {
      res.status(400).json(err);
    }
  }
});

// @route POST api/ingredients
// @desc Add new ingredient
// @access Private
router.post('/', async (req, res) => {
  const ingredientName = _.lowerCase(req.body.name);
  const ingredientQuantityType = _.lowerCase(req.body.quantityType);
  const createdByEmail = req.body.createdBy;

  const foundIngredient = await Ingredient.findOne({name: ingredientName});

  if (foundIngredient) {
    res.status(400).json('that ingredient already exists');
  }

  const newIngredient = new Ingredient({
    name: ingredientName,
    quantityType: ingredientQuantityType,
    createdBy: createdByEmail,
  });

  try {
    if (!foundIngredient) {
      const createdIngredient = await newIngredient.save();

      res.status(201).json(createdIngredient);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// @route GET api/ingredients/:ingredientName
// @desc Get one ingredient by name
// @access Private
router.get('/:name', async (req, res) => {
  const ingredientName = _.lowerCase(req.params.name);

  try {
    const foundIngredient = await Ingredient.findOne({name: ingredientName});

    res.status(200).json(foundIngredient);
  } catch (err) {
    res.status(404).json(err);
  }
});

// @route PUT api/ingredients/:ingredientName
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
    if (!isEmpty(req.body.quantityType)) {
      const newQuantityType = _.lowerCase(req.body.quantityType);

      foundIngredient.quantityType = newQuantityType;
    }

    foundIngredient.save();

    res.status(200).json(foundIngredient);
  } catch (err) {
    res.status(204).json(err);
  }
});

// @route DELETE api/ingredients/:ingredientName
// @desc Delete one ingredient by name
// @access Private
router.delete('/:name', async (req, res) => {
  try {
    const ingredientName = _.lowerCase(req.params.name);

    Ingredient.deleteOne({name: ingredientName});

    res.status(200).json('success');
  } catch (err) {
    res.status(204).json(err);
  }
});

module.exports = router;
