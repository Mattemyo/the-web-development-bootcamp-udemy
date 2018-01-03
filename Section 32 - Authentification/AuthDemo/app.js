const express = require("express"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/auth_demo_app");
const app = express();
app.set("view engine", "ejs");

// LANDING PAGE
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", function(req, res) {
  res.render("secret");
});

app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
