const express = require("express"),
  seedDB = require("./seeds"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  LocalStrategy = require("passport-local"),
  Comment = require("./models/comment"),
  Campground = require("./models/campground"),
  bodyParser = require("body-parser"),
  User = require("./models/user"),
  app = express();

mongoose.connect("mongodb://localhost/yelp_camp_v7");
app.use(bodyParser.urlencoded({ extended: true }));
//Fill database with data
seedDB();
//serve public directory
app.use(express.static(__dirname + "/public"));
// shorten file names
app.set("view engine", "ejs");

//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "this is my secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to show login/logout depending on status
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// landing page
app.get("/", function(req, res) {
  res.render("landing");
});
// campgrounds page

//page for adding new campgrounds
// NEW - show form to create new
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

//=====================
// AUTH ROUTES
//=====================
//show register form
app.get("/register", function(req, res) {
  res.render("register");
});

//handle signup logic
app.post("/register", function(req, res) {
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
app.get("/login", function(req, res) {
  res.render("login");
});
// login logic
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "login"
  }),
  function(req, res) {
    //callback function
  }
);
//logic logout route
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// port 3000
app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
