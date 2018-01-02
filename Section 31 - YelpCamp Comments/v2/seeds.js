const mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment");

const data = [
  {
    name: "Cloud's Rest",
    image:
      "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "Blah blah blah"
  },
  {
    name: "Desert Mesa",
    image:
      "https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "Blah blah blah"
  },
  {
    name: "Canyon Floor",
    image:
      "https://images.pexels.com/photos/176381/pexels-photo-176381.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "Blah blah blah"
  }
];

function seedDB() {
  //remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds");
    //add some campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added to campgrounds");
          //create comment
          Comment.create(
            {
              text: "Great Place. No internet, though...",
              author: "Homer"
            },
            function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                campgrounds.comments.push(comment);
                campground.save();
                console.log("Created new Comment");
              }
            }
          );
        }
      }); //create
    }); //forEach
  }); //remove
}

module.exports = seedDB;
