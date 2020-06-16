require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const userRoutes = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
try {
	mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
	console.log("MongoDB successfully connected.");
} catch(err) {
	console.log(err);
}

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server up and running on port " + port + "!"));