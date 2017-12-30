const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

const Cat = mongoose.model("Cat", catSchema);
// add new cat to DB
// const george = new Cat({
//   name: "Mrs Norris",
//   age: 7,
//   temperament: "Evil"
// });
// console.log("hej");

// // save object to DB
// george.save(function (err, cat) {
//   if (err) {
//     console.log("oops");
//   } else {
//     console.log("saved to DB");
//     console.log(cat);
//   }
// });


// //console.log each cat from database
// Cat.find({}, function (err, cat) {
//   if (err) {
//     console.log('oops');
//   } else {
//     console.log('all cats', cat);

//   }
// });

Cat.create({
  name: "Snow White",
  age: 15,
  temperament: "Bland"
}, (err, cat) => {
if(err){
  console.log(err);
} else{
  console.log(cat);
  
}
});