const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
  const animal = req.params.animal.toLowerCase();
  const speak = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof Woof"
  };

  res.send(`The ${animal} says '${speak[animal]}'`);
});

app.get("/repeat/:txt/:num", function(req, res) {
  const txt = req.params.txt + " ";
  const num = req.params.num;

  let str = "";
  for (var i = 0; i < num; i++) {
    str += txt;
  }
  res.send(str);
});

app.get('*', function(req, res) {
  res.send('You got lost in the sauce');
});

app.listen(3000, () => console.log("server is active"));
