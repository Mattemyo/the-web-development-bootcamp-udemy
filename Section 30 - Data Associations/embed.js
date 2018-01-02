const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//POST
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

// USER
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});
const User = mongoose.model("User", userSchema);

const newUser = new User({
  email: "pinha@dinho.edu",
  name: "Pinha"
});

newUser.posts.push({
  title: "How to play soccer",
  content: "1+1=3"
});

// newUser.save(function(err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// const newPost = new Post({
//     title: 'Thoughts on life',
//     content: 'It is great'
// });

// newPost.save(function(err, post) {
//     if(err){
//         console.log(err);
//     } else{
//       console.log(post);
//     }
// });

// User.findOne({ name: "Pinha" }, function(err, user) {
//   if (err) {
//     // console.log(err);
//   } else {
//     user.posts.push({
//       title: "3 Things I hate",
//       content: "Food, Antarctica, Cold0"
//     });
//     user.save(function(err, user) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(user);
//       }
//     });
//   }
// });
