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

mongoose.connect("mongodb://localhost/yelp_camp_v6");
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
// landing page
app.get("/", function(req, res) {
  res.render("landing");
});
// campgrounds page
//INDEX, show all campgrounds
app.get("/campgrounds", function(req, res) {
  //get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});
// add new post route
// CREATE - add new campground to db
app.post("/campgrounds", function(req, res) {
  //add form data to campgrounds array
  Campground.create(
    {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description
    },
    (err, newlyCreated) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/campgrounds");
      }
    }
  );
});
//page for adding new campgrounds
// NEW - show form to create new
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

// SHOW
app.get("/campgrounds/:id", function(req, res) {
  // find campgrounds with provided id
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        //render show template with that campground
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});
// =================
//COMMENTS ROUTES
// =================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
  //lookup campground using ID
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
      // connect new comment to campground
      //redirect campground show page
    }
  });
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
