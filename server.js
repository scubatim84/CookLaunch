import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';

// Authentication strategy
import { authJwt } from './config/passport.js';

// API Routes
import authRoutes from './routes/api/auth.js';
import userRoutes from './routes/api/user.js';
import pantryRoutes from './routes/api/pantry.js';
import groceriesRoutes from './routes/api/groceries.js';
import recipeRoutes from './routes/api/recipes.js';
import ingredientRoutes from './routes/api/ingredients.js';

// Other Routes
import fileUploadRoute from './routes/uploadfiles.js';

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
app.use('/api/ingredients', authJwt, ingredientRoutes);
app.use('/api/user', authJwt, userRoutes);
app.use('/api/pantry', authJwt, pantryRoutes);
app.use('/api/groceries', authJwt, groceriesRoutes);
app.use('/api/recipes', authJwt, recipeRoutes);

// Other route
app.use('/uploadfiles', authJwt, fileUploadRoute);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'));

  // Express will serve up index.html file if it doesn't recognize route
  const __dirname = path.resolve();
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log('Server up and running on port ' + port + '!')
);

export default app;
