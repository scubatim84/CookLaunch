import mongoose from 'mongoose';
import IngredientSchema from './Ingredient';

const { Schema } = mongoose;

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

export default {
  Recipe,
  RecipeSchema,
};
