import express from 'express';
import isEmpty from 'is-empty';

// Load Recipe model
import Recipe from '../../models/Recipe.js';

// Set up Express router
const router = express.Router();

// @route GET api/recipes
// @desc Get all recipes created by user making request
// @access Private
router.get('/', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, retrieve list of all recipes created by that user
  if (foundUser) {
    const recipes = await Recipe.find({ createdBy: foundUser._id });

    try {
      res.status(200).json(recipes);
    } catch (err) {
      res.status(500).json(`An error has occurred. ${err}`);
    }
  } else {
    res.status(500).json('No user found in database.');
  }
});

// @route POST api/recipes
// @desc Add new recipe
// @access Private
router.post('/', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, create recipe
  if (foundUser) {
    try {
      const recipeName = req.body.name;
      const recipeIngredients = req.body.ingredients;
      const recipeImageUrl = req.body.imageUrl;
      const recipeKey = req.body.imageKey;

      const foundRecipe = await Recipe.findOne({
        name: recipeName.toUpperCase(),
        createdBy: foundUser._id,
      });

      if (foundRecipe) {
        res.status(400).json('That recipe already exists.');
      }

      const newRecipe = new Recipe({
        name: recipeName,
        ingredients: recipeIngredients,
        createdBy: foundUser._id,
        imageUrl: recipeImageUrl,
        imageKey: recipeKey,
      });

      if (!foundRecipe) {
        const createdRecipe = await newRecipe.save();

        res.status(201).json(createdRecipe);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).send('No user found in database.');
  }
});

// @route GET api/recipes/:id
// @desc Get one recipe by ID if created by user
// @access Private
router.get('/:id', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, find recipe if created by that user
  if (foundUser) {
    try {
      const foundRecipe = await Recipe.findOne({
        _id: req.params.id,
        createdBy: foundUser._id,
      });

      if (foundRecipe) {
        res.status(200).json(foundRecipe);
      } else {
        res.status(400).send('That recipe was not created by this user.');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).send('No user found in database.');
  }
});

// @route PUT api/recipes/:id
// @desc Update one recipe by ID if created by user
// @access Private
router.put('/:id', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, find recipe if created by that user
  if (foundUser) {
    try {
      const foundRecipe = await Recipe.findOne({
        _id: req.params.id,
        createdBy: foundUser._id,
      });

      if (foundRecipe) {
        if (!isEmpty(req.body.name)) {
          foundRecipe.name = req.body.name;
        }

        if (!isEmpty(req.body.ingredients)) {
          foundRecipe.ingredients = req.body.ingredients;
        }

        foundRecipe.imageUrl = req.body.imageUrl;
        foundRecipe.imageKey = req.body.imageKey;
        foundRecipe.dateLastChanged = new Date();

        await foundRecipe.save();

        res.status(204).json(null);
      } else {
        res.status(400).json('fail');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json('No user found in database.');
  }
});

// @route DELETE api/recipes/:id
// @desc Delete one recipe by ID if created by that user
// @access Private
router.delete('/:id', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, find recipe if created by that user
  if (foundUser) {
    try {
      const deletedRecipe = await Recipe.deleteOne({
        _id: req.params.id,
        createdBy: foundUser._id,
      });

      if (deletedRecipe.deletedCount === 1) {
        res.status(204).json(null);
      } else {
        res.status(400).json('fail');
      }
    } catch (err) {
      res.status(500).json(`An error has occurred. ${err}`);
    }
  } else {
    res.status(500).json('No user found in database.');
  }
});

export default router;
