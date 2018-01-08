const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const User = require("../models/user");

// root route
router.get("/", function(req, res) {
  res.render("landing");
});

//show regiter route
router.get("/register", function(req, res) {
  res.render("register");
});

//handle signup logic
router.post("/register", function(req, res) {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    });
  });
});
//show login form
router.get("/login", function(req, res) {
  res.render("login", { message: req.flash("error") });
});
// login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "login"
  }),
  function(req, res) {
    //callback function
  }
);

//logout route
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds");
});

module.exports = router;
