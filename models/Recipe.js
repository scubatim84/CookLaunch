const {IngredientSchema} = require('./Ingredient');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [IngredientSchema],
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = {
  Recipe,
  RecipeSchema,
};
