const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantityType: {
    type: String,
    required: true,
  },
  userCreated: {
    type: Boolean,
    required: true,
  },
});

module.exports = Ingredient = mongoose.model('ingredients', IngredientSchema);
