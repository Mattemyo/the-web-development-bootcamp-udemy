const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
// shortcut
app.set('view engine', 'ejs');

// array of friends
const friends = [
    'Tony', 'Miranda', 'Justin', 'Pierre', 'Lily'
];
// Home page
app.get('/', function (req, res) {
    res.render('home');
});
// add new friend to the array
app.post('/addfriend', function (req, res) {
    // push input value into friends array
    friends.push(req.body.newfriend);
    res.redirect('/friends');
});
// friends form
app.get('/friends', function (req, res) {

    res.render('friends', {
        friends: friends
    });
});


// Localhost
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});