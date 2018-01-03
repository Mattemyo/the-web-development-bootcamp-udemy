const mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment");

const data = [
  {
    name: "Cloud's Rest",
    image:
      "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "Ut sunt assumenda nisi. Aliquam culpa molestias. Aut qui est voluptate nisi consequatur sed ullam. Vitae quo ea rerum cupiditate repellat. Impedit in autem unde facilis."
  },
  {
    name: "Desert Mesa",
    image:
      "https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "Cum aliquid rem sed doloremque eum. Atque ea sunt reprehenderit iusto. Veritatis illo nostrum voluptatum consequatur accusantium sapiente temporibus adipisci. Consequatur omnis voluptatem aut autem excepturi. Quos error quo perferendis necessitatibus vel."
  },
  {
    name: "Canyon Floor",
    image:
      "https://images.pexels.com/photos/176381/pexels-photo-176381.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "Sit in eveniet ipsa velit at alias sed distinctio autem. Qui sapiente non necessitatibus possimus ullam ea corporis maxime. Explicabo tempore aliquid. Modi suscipit omnis maiores aut non qui vel. Expedita non nihil et. Quas molestiae assumenda dicta qui dolor sed."
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
                campground.comments.push(comment);
                campground.save();
                console.log("Created new Comment", comment);
              }
            }
          );
        }
      }); //create
    }); //forEach
  }); //remove
}

module.exports = seedDB;
