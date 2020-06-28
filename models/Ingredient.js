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
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

module.exports = Ingredient = mongoose.model('ingredients', IngredientSchema);
module.exports = IngredientSchema;
