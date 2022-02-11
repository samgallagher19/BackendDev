
const express = require('express');

const app = express();

app.get("/", function(request, response) {
  response.send("<h1>hello world</h1>");
});

app.get("/contact", function(request, response) {
  response.send("Contact me at samuel.gallagher@cengage.com");
});

app.get("/about", function(request, response) {
  response.send("My name is Sam Gallagher and I am a Technical Content Developer.");
});

app.get("/hobbies", function(request, response) {
  response.send("tennis, sourdough");
});

app.listen(3000, function() {
  console.log("server started on port 3000");
});
