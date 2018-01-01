//require
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");

//app config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


// config mongoose/model
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }

});


// Blog.create({
//   title: "Text Blog",
//   image: 'https://images.pexels.com/photos/374825/pexels-photo-374825.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
//   body: 'hello. This is a new blog post'
// });

const Blog = mongoose.model("Blog", blogSchema);

// Restful routes
app.get('/', function (req, res) {
  res.redirect('/blogs');
});
//index
app.get('/blogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log('err');
    } else {
      res.render('index', {
        blogs: blogs
      });
    }
  });
});


console.log("hej");


app.listen(3000, function () {
  console.log("App listening on port 3000!");
});