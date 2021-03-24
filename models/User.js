import mongoose from 'mongoose';
import Ingredient from './Ingredient.js';

const { Schema } = mongoose;

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
    type: [Ingredient.Schema],
  },
  groceries: {
    type: [Ingredient.Schema],
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

const User = mongoose.model('user', UserSchema);

export default User;
