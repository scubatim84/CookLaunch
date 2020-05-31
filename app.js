const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

let ingredientUserName = process.env.ingredientUserName;

let ingredientPassword = process.env.ingredientPassword;

let ingredientCluster = process.env.ingredientCluster;

const mongooseUri = "mongodb+srv://" + ingredientUserName + ":" + ingredientPassword + "@" + ingredientCluster;

mongoose.connect(mongooseUri, {useNewUrlParser: true, useUnifiedTopology: true });

const ingredientSchema = { 
	name: String,
	userCreated: Boolean
};

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

app.route("/")
  .get(function(req, res) {
    res.render("home");
  });

// REST API to perform CRUD operations on ingredients database
app.route("/ingredients")
  .get(function(req, res) {
    Ingredient.find({}, function(err, foundIngredients) {
      if (!err) {
        res.status(200);
        res.send(foundIngredients);
      } else {
        if (!foundIngredients) {
          res.status(404);
          res.send(err);
        } else {
          res.status(400);
          res.send(err);
        }
      }
    });

  })
  
  .post(function(req, res) {
    const newIngredient = new Ingredient({
			name: req.body.name,
			userCreated: req.body.userCreated
		});
		
    newIngredient.save(function(err, createIngredient) {
      if(!err) {
        res.status(201);
        res.send(createIngredient);
      } else {
        res.status(204);
        res.send(err);
      }
    });

  });

app.route("/ingredients/:ingredientName")
  .get(function(req, res) {
    Ingredient.find({name: req.params.ingredientName}, function(err, foundIngredient) {
      if (!err) {
        res.send(foundIngredient);
      } else {
        res.send(err);
      }
    });

  })

  .put(function(req, res) {
		const updateIngredient = {
			name: req.body.name,
			userCreated: req.body.userCreated
		};

		Ingredient.updateOne({name: req.params.ingredientName}, updateIngredient, function(err) {
			if(!err) {
        res.status(200);
        res.send("Successfully updated the ingredient.");
      } else {
        res.status(204);
        res.send(err);
      }
		});

  })
  
  .delete(function(req, res) {
		Ingredient.deleteOne({name: req.params.ingredientName}, function(err) {
			if(!err) {
        res.status(200);
        res.send("Successfully deleted the ingredient.");
      } else {
        res.status(204);
        res.send(err);
      }
		});

  });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started running successfully on port " + port + ".");
});
  