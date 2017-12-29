const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("hello there");
});
app.get("/bye", function(req, res) {
  res.send("bye there");
});
app.get("/dog", function(req, res) {
  res.send("Mjau");
});
app.get("/r/:subredditName", function(req, res) {
    
  res.send(`Welcome to the ${req.params.subredditName} subreddit`);
});
app.get("/r/:subredditName/:id/:title", function(req, res) {
  res.send("Reddito");
});
app.get("*", function(req, res) {
  res.send("Oops");
});





app.listen(3000, ()=> console.log('server is active'));