const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({encoded: true}));


app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?&q=" + query + "&appid=72cdac2058081993baf3180052fec594&units=imperial";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {

      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.write("<p>The weather is currently " + weatherDescription + ".</p>");
      res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>")
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees F.</h1>");
      res.send();
    })
  })
})



app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
