const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({ extended: true }));
//Fill database with data
seedDB();

// shorten file names
app.set("view engine", "ejs");

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
      res.render("index", { campgrounds: allCampgrounds });
    }
  });

  // res.render("campgrounds", { campgrounds: campgrounds });
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
  res.render("new");
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
        res.render("show", { campground: foundCampground });
      }
    });
});

// port 3000
app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
