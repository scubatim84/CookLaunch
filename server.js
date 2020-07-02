require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const userRoutes = require('./routes/api/users');
const pantryRoutes = require('./routes/api/pantry');
const ingredientRoutes = require('./routes/api/ingredients');

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
try {
  mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log('MongoDB successfully connected.');
} catch (err) {
  console.log(err);
}

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/ingredients', ingredientRoutes);

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
