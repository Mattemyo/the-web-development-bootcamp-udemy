const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds"),
  Comment = require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp_v4");
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
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
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
app.get("/campgrounds/:id/comments/new", function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res) {
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
          campground.comments.push(comment._id);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
      // connect new comment to campground
      //redirect campground show page
    }
  });
});
// port 3000
app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
