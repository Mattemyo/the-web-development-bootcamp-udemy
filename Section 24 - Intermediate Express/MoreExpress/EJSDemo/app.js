const express = require("express");
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Home
app.get("/", function(req, res) {
  res.render("home");
  res.send("<h1>Welcome to Home Page</h1>");
});

//fall in love
app.get("/fallinlovewith/:thing", function(req, res) {
  const thing = req.params.thing;
  res.render("love", {thing : thing});
});

app.get('/posts', function(req, res) {
  const posts = [
    {title: 'Post 1', author: 'Susy'},
    {title: 'Bunny', author: 'Charlie'},
    {title: 'Pomsky', author: 'Colt'}
  ];
  res.render('posts', {posts : posts});

});



app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
