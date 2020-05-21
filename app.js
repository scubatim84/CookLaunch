const express = require("express");
const ejs = require("ejs");

const app = express();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.route("/")
  .get(function(req, res) {
    res.render("home");
  });

app.listen(3000, function() {
  console.log("Server started running on port 3000.");
});
  