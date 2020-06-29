const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  quantityType: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const Ingredient = mongoose.model('ingredients', IngredientSchema);

module.exports = {
  Ingredient,
  IngredientSchema,
};
