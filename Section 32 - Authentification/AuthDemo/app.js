//packages
const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  //require models
  User = require("./models/user");

//connect to DB
mongoose.connect("mongodb://localhost/auth_demo_app");

//start express
const app = express();
//shorten file names
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//ACTIVATE PASSPORT
app.use(
  require("express-session")({
    secret: "Aik e best",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =================
//ROUTES
// =================

// LANDING PAGE
app.get("/", function(req, res) {
  res.render("home");
});
//secret
app.get("/secret", function(req, res) {
  res.render("secret");
});

//Auth routes
//show sign up form
app.get("/register", function(req, res) {
  res.render("register");
});

//handle user signup
app.post("/register", function(req, res) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.error(err);
        res.render("register");
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/secret");
        });
      }
    }
  );
});
//LOGIN ROUTES
//render login form
app.get("/login", function(req, res) {
  res.render("login");
});

//login logic
//middleware is code before callback
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }),
  function(req, res) {
    //empty for now
  }
);

app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
