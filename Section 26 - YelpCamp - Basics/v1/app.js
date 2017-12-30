const express = require("express");
const app = express();
// in addition to express
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

// shorten file names
app.set("view engine", "ejs");
// landing page
app.get("/", function(req, res) {
  res.render("landing");
});
//array of campgrounds
const campgrounds = [
  {
    name: "Salmon Creek",
    image:
      "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?h=350&auto=compress&cs=tinysrgb"
  },
  {
    name: "Granite Hill",
    image:
      "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?h=350&auto=compress&cs=tinysrgb"
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?h=350&auto=compress&cs=tinysrgb"
  }
];
// campgrounds page
app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", { campgrounds: campgrounds });
});
// add new post route
app.post("/campgrounds", function(req, res) {
  //add form data to campgrounds array
  campgrounds.push({
    name: req.body.name,
    image: req.body.image
  });

  //redirect back to campgrounds page
  res.redirect("/campgrounds");
});
//page for adding new campgrounds
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

// port 3000
app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
