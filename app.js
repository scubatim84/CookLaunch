const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const mongooseConfig = require('./config');

const app = express();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

let ingredientUserName = process.env.ingredientUserName;
if (ingredientUserName == undefined || ingredientUserName == null) {
  ingredientUserName = mongooseConfig.username;
}

let ingredientPassword = process.env.ingredientPassword;
if (ingredientPassword == undefined || ingredientPassword == null) {
  ingredientPassword = mongooseConfig.password;
}

let ingredientCluster = process.env.ingredientCluster;
if (ingredientCluster == undefined || ingredientCluster == null) {
  ingredientCluster = mongooseConfig.cluster;
}

const mongooseUri = "mongodb+srv://" + ingredientUserName + ":" + ingredientPassword + "@" + ingredientCluster;

console.log(mongooseUri);

mongoose.connect(mongooseUri, {useNewUrlParser: true, useUnifiedTopology: true });

const ingredientSchema = { 
  name: String 
};

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

app.route("/")
  .get(function(req, res) {
    res.render("home");
  });

app.route("/ingredients")
  .get(function(req, res) {
    Ingredient.find({}, function(err, foundIngredients) {
      if (!err) {
        res.status(200);
        res.send(foundIngredients);
      } else {
        if (!foundIngredients) {
          res.status(404);
        } else {
          res.status(400);
        }
      }
    });

  })
  
  .post(function(req, res) {
    let newIngredient = new Ingredient({
      name: req.body.name
    });

    newIngredient.save(function(err) {
      if(!err) {
        res.status(201);
        res.send("Successfully created ingredient.");
      } else {
        Ingredient.find({name: newIngredient.name}, function(err, foundIngredient) {
          if (!foundIngredient) {
            res.status(200);
          } else {
            res.status(204);
          }
        });
      }
    });

  });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started running successfully.");
});
  