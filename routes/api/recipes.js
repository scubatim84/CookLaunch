require('dotenv').config();
const express = require('express');
const isEmpty = require('is-empty');
const router = express.Router();
const _ = require('lodash');

// Load Recipe model
const {Recipe} = require('../../models/Recipe');

// @route GET api/recipes
// @desc Get all recipes created by user making request
// @access Private
router.get('/', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, retrieve list of all recipes created by that user
  if (foundUser) {
    const recipes = await Recipe.find({createdBy: foundUser._id});

    try {
      res.status(200).json(recipes);
    } catch (err) {
      res.status(400).json('An error has occurred. ' + err);
    }
  } else {
    res.status(400).json('No user found in database.');
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

      const foundRecipe = await Recipe.findOne({
        name: recipeName,
        createdBy: foundUser._id,
      });

      if (foundRecipe) {
        res.status(400).json('That recipe already exists.');
      }

      const newRecipe = new Recipe({
        name: recipeName,
        ingredients: recipeIngredients,
        createdBy: foundUser._id,
      });

      if (!foundRecipe) {
        const createdRecipe = await newRecipe.save();

        res.status(201).json(createdRecipe);
      }
    } catch (err) {
      console.log(err);

      res.status(400).json(err);
    }
  } else {
    res.status(404).send('No user found in database.');
  }
});

// @route GET api/recipes/:name
// @desc Get one recipe by name if created by user
// @access Private
router.get('/:name', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, find recipe if created by that user
  if (foundUser) {
    try {
      const recipeName = _.lowerCase(req.params.name);

      const foundRecipe = await Recipe.findOne({
        name: recipeName,
        createdBy: foundUser._id,
      });

      if (foundRecipe) {
        res.status(200).json(foundRecipe);
      } else {
        res.status(400).send('That recipe was not created by this user.');
      }
    } catch (err) {
      res.status(404).json(err);
    }
  } else {
    res.status(404).send('No user found in database.');
  }
});

// @route PUT api/recipes/:name
// @desc Update one recipe by name if created by user
// @access Private
router.put('/:name', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, find recipe if created by that user
  if (foundUser) {
    try {
      const recipeName = _.lowerCase(req.params.name);

      const foundRecipe = await Recipe.findOne({
        name: recipeName,
        createdBy: foundUser._id,
      });

      if (foundRecipe) {
        if (!isEmpty(req.body.name)) {
          foundRecipe.name = _.lowerCase(req.body.name);
        }

        if (!isEmpty(req.body.ingredients)) {
          foundRecipe.ingredients = req.body.ingredients;
        }

        await foundRecipe.save();

        res.status(200).json(foundRecipe);
      } else {
        res.status(400).json('fail');
      }
    } catch (err) {
      res.status(204).json(err);
    }
  } else {
    res.status(404).send('No user found in database.');
  }
});

// @route DELETE api/recipes/:name
// @desc Delete one recipe by name if created by that user
// @access Private
router.delete('/:name', async (req, res) => {
  // Obtain user from request
  const foundUser = req.user;

  // Once user is found, find recipe if created by that user
  if (foundUser) {
    try {
      const recipeName = _.lowerCase(req.params.name);

      const deletedRecipe = await Recipe.deleteOne({
        name: recipeName,
        createdBy: foundUser._id,
      });

      if (deletedRecipe.deletedCount == 1) {
        res.status(200).json('success');
      } else {
        res.status(400).json('fail');
      }
    } catch (err) {
      res.status(204).json(err);
    }
  } else {
    res.status(404).send('No user found in database.');
  }
});

module.exports = router;
