import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

// API Routes
import authRoutes from './routes/api/auth.js';
import userRoutes from './routes/api/user.js';
import pantryRoutes from './routes/api/pantry.js';
import groceriesRoutes from './routes/api/groceries.js';
import recipeRoutes from './routes/api/recipes.js';
import ingredientRoutes from './routes/api/ingredients.js';

// Set up Express server
const app = express();

// Set up environment variable support
dotenv.config();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
try {
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB successfully connected.');
} catch (err) {
  console.log(err);
}

// Passport middleware
app.use(passport.initialize());

// API routes
app.use('/api/auth', authRoutes);
app.use(
  '/api/ingredients',
  passport.authenticate('jwt', { session: false }),
  ingredientRoutes
);
app.use(
  '/api/user',
  passport.authenticate('jwt', { session: false }),
  userRoutes
);
app.use(
  '/api/pantry',
  passport.authenticate('jwt', { session: false }),
  pantryRoutes
);
app.use(
  '/api/groceries',
  passport.authenticate('jwt', { session: false }),
  groceriesRoutes
);
app.use(
  '/api/recipes',
  passport.authenticate('jwt', { session: false }),
  recipeRoutes
);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'));

  // Express will serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log('Server up and running on port ' + port + '!')
);

export default app;
