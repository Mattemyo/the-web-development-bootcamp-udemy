const express = require("express");
const app = express();
const request = require("request");
app.set('view engine', 'ejs');
app.get("/results", function(req, res) {
  request("http://www.omdbapi.com/?s=california&apikey=thewdb", function(
    error,
    response,
    body
  ) {
    if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
      res.send(data.Search[0].Title);
    }
  }); //request
}); //app.get

app.listen(3000, function() {
  console.log("App listening on port 3000!");
});