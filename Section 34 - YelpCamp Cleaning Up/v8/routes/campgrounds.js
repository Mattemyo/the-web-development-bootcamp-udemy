const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Comment = require("../models/comment");

//INDEX, show all campgrounds
router.get("/", function(req, res) {
  //get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("./campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

// CREATE - add new campground to db
router.post("/", function(req, res) {
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

// NEW - show form to create new
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

// SHOW
router.get("/:id", function(req, res) {
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

module.exports = router;
