//require
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer");

//app config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(methodOverride("_method"));
app.use(expressSanitizer());

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
app.get("/", function(req, res) {
  res.redirect("/blogs");
});
//INDEX route
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log("err");
    } else {
      res.render("index", {
        blogs: blogs
      });
    }
  });
});

//NEW route
app.get("/blogs/new", function(req, res) {
  res.render("new");
});
//CREATE route
app.post("/blogs", function(req, res) {
  //create blog
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      //then redirect
      res.redirect("/blogs");
    }
  });
});

//SHOW route
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});
//EDIT Route
app.get("/blogs/:id/edit", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});
//UPDATE route
app.put("/blogs/:id", function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);

  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(
    err,
    updatedBlog
  ) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect(`/blogs/${req.params.id}`);
    }
  });
});
//DELETE route
app.delete("/blogs/:id", function(req, res) {
  //destroy blog
  Blog.findOneAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("blogs");
    }
  });
  //redirect
});

app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
