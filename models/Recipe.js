import mongoose from 'mongoose';
import Ingredient from './Ingredient.js';

const { Schema } = mongoose;

// Create Schema
const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [Ingredient.Schema],
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  dateLastChanged: {
    type: Date,
    default: new Date(),
  },
  imageUrl: {
    type: String,
    required: false,
  },
  imageKey: {
    type: String,
    required: false,
  },
});

const Recipe = mongoose.model('recipe', RecipeSchema);

export default Recipe;
