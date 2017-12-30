const express = require("express");
const app = express();

// shortcut
app.set("view engine", "ejs");
// landing page
app.get("/", function(req, res) {
  res.render("landing");
});
// campground
app.get("/campgrounds", function(req, res) {
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
  res.render("campgrounds", { campgrounds: campgrounds });
});

// port 3000
app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
