import mongoose from 'mongoose';
import { IngredientSchema } from './Ingredient.js';

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  pantry: {
    type: [IngredientSchema],
  },
  groceries: {
    type: [IngredientSchema],
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

export const User = mongoose.model('user', UserSchema);

export default User;
