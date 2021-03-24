/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';

// Authentication strategy
import authJwt from './config/passport.js';

// API Routes
import authRoutes from './api/routes/auth.js';
import userRoutes from './api/routes/user.js';
import pantryRoutes from './api/routes/pantry.js';
import groceriesRoutes from './api/routes/groceries.js';
import recipeRoutes from './api/routes/recipes.js';
import ingredientRoutes from './api/routes/ingredients.js';
import fileUploadRoute from './api/routes/files.js';

// Set up Express server
const app = express();

// Set up environment variable support
dotenv.config();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

// Passport middleware
app.use(passport.initialize());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/ingredients', authJwt, ingredientRoutes);
app.use('/api/user', authJwt, userRoutes);
app.use('/api/pantry', authJwt, pantryRoutes);
app.use('/api/groceries', authJwt, groceriesRoutes);
app.use('/api/recipes', authJwt, recipeRoutes);

// Other route
app.use('/files', authJwt, fileUploadRoute);

// Production settings
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'));

  // Express will serve up index.html file if it doesn't recognize route
  const rootDirectory = path.resolve();

  app.get('*', (req, res) => {
    res.sendFile(path.join(rootDirectory, 'client', 'build', 'index.html'));
  });
}

// Set up port
const port = process.env.PORT || 5000;

app.listen(port);

export default app;
