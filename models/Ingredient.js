import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Create Schema
export const IngredientSchema = new Schema({
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
  },
  dateLastChanged: {
    type: Date,
    default: new Date(),
  },
  checked: {
    type: Boolean,
    default: false,
  },
  groceryExtra: {
    type: Boolean,
    default: false,
  },
});

export const Ingredient = mongoose.model('ingredient', IngredientSchema);

export default {
  Ingredient,
  IngredientSchema,
};
