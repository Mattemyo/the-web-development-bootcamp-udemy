const express = require("express"),
  app = express(),
  // in addition to express
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
// shorten file names
app.set("view engine", "ejs");

//insert schema
// Schema is like bluerprint
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Salmon Creek",
//     image:
//       "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?h=350&auto=compress&cs=tinysrgb"
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
app.get("/campgrounds", function(req, res) {
  //get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", { campgrounds: allCampgrounds });
    }
  });

  // res.render("campgrounds", { campgrounds: campgrounds });
});
// add new post route
app.post("/campgrounds", function(req, res) {
  //add form data to campgrounds array
  Campground.create(
    {
      name: req.body.name,
      image: req.body.image
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
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

// port 3000
app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
