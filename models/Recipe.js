import mongoose from 'mongoose';
import { IngredientSchema } from './Ingredient.js';

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
  dateLastChanged: {
    type: Date,
    default: new Date(),
  },
});

export const Recipe = mongoose.model('recipe', RecipeSchema);

export default {
  Recipe,
  RecipeSchema,
};
