const express = require("express"),
  seedDB = require("./seeds"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  Comment = require("./models/comment"),
  Campground = require("./models/campground"),
  bodyParser = require("body-parser"),
  User = require("./models/user"),
  app = express();

//require routes
const commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v11");
app.use(bodyParser.urlencoded({ extended: true }));
//Fill database with data

// seedDB();

//serve public directory
app.use(express.static(__dirname + "/public"));
// shorten file names
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

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
//send flash message to all relevant pages
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//use route files
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// port 3000
app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
