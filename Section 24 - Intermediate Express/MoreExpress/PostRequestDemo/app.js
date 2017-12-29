const express = require('express');
const app = express();

// shortcut
app.set('view engine', 'ejs');

// Home page
app.get('/', function(req, res) {
    res.render('home');
});
// add new friend to the array
app.post('/addfriend', function(req, res) {
    res.send('post route');
});
// friends form
app.get('/friends', function(req, res) {
    const friends = [
        'Tony', 'Miranda', 'Justin', 'Pierre', 'Lily'];
    res.render('friends', {friends: friends});
});


// Localhost
app.listen(3000, function() {
    console.log('App listening on port 3000!');
});