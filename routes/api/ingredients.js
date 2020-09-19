import express from 'express';
import isEmpty from 'is-empty';

// Load Ingredient model
import { Ingredient } from '../../models/Ingredient.js';

// Set up Express router
const router = express.Router();

// @route GET api/ingredients
// @desc Get all ingredients
// @access Private
router.get('/', async (req, res) => {
  try {
    const foundIngredients = await Ingredient.find({});

    if (foundIngredients) {
      res.status(200).json(foundIngredients);
    } else {
      res.status(404).json('Ingredients not found.');
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
    const ingredientName = req.body.name.toUpperCase();
    const createdByEmail = req.body.createdBy;

    const foundIngredient = await Ingredient.findOne({ name: ingredientName });

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

// @route GET api/ingredients/:id
// @desc Get one ingredient by id
// @access Private
router.get('/:id', async (req, res) => {
  try {
    const foundIngredient = await Ingredient.findOne({ _id: req.params.id });

    res.status(200).json(foundIngredient);
  } catch (err) {
    res.status(404).json(err);
  }
});

// @route PUT api/ingredients/:id
// @desc Update one ingredient by id
// @access Private
router.put('/:id', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, update ingredient if created by user
  if (foundUser) {
    try {
      const foundIngredient = await Ingredient.findOne({
        _id: req.params.id,
        createdBy: foundUser._id,
      });

      if (!isEmpty(req.body.name)) {
        foundIngredient.name = req.body.name.toUpperCase();
      }

      await foundIngredient.save();

      res.status(204).send(null);
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(400).send('No user found in database.');
  }
});

// @route DELETE api/ingredients/:id
// @desc Delete ingredient by id
// @access Private
router.delete('/:id', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, delete ingredient if created by user
  if (foundUser) {
    try {
      const deletedIngredient = await Ingredient.deleteOne({
        _id: req.params.id,
        createdBy: foundUser._id,
      });

      if (deletedIngredient.deletedCount === 1) {
        res.status(204).send(null);
      } else {
        res.status(400).json('Ingredient deletion failed.');
      }
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(404).send('No user found in database.');
  }
});

export default router;
