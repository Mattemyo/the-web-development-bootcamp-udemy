const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds");
  
  seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
// shorten file names
app.set("view engine", "ejs");

// Campground.create(
//   {
//     name: "Salmon Creek",
//     image:
//       "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?h=350&auto=compress&cs=tinysrgb",
//     description: "This is an awesome Creek! Great place"
//   },
//   (err, campgrounds) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("campground", campgrounds);
//     }
//   }
// );

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

//must be after /new, otherwise, new will be considered id
app.get("/campgrounds/:id", function(req, res) {
  // find campgrounds with provided id
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      //render show template with that campground
      res.render("show", { campground: foundCampground });
    }
  });
});

// port 3000
app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
