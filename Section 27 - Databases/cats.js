const mongoose = require("mongoose");
mongoose.connect = "mongodb://localhost/cat_app";

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});
const Cat = mongoose.model("Cat", catSchema);

Cat.create;
//TODO: add new cat to DB

//console.log each cat from database
