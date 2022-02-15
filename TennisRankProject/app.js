const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({encoded:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  const playerName = req.body.lastName + ", " + req.body.firstName;
  console.log("Site is functioning");
  const key = "hzfp53fuhjkra2fq6mjg6692#";
  const url = "https://api.sportradar.com/tennis/trial/v3/en/rankings.json?api_key=" + key;
  https.get(url, function(response){
    console.log(response.statusCode);
    //console.log(response);
    let chunks = [];

    response.on("data", function(data){
      chunks.push(data);
    }).on('end', function() {
      let data = Buffer.concat(chunks);
      console.log(data);
      //console.log("reponse.on begun");
      const rankData = JSON.parse(data);
      var playerFound = 0;
      for(var i = 0; i < rankData.rankings[0].competitor_rankings.length; i++){

        if(rankData.rankings[0].competitor_rankings[i].competitor.name === playerName) {

          res.write("<p>Player Name: " + playerName + "</p>");
          res.write("<p>Rank: " + rankData.rankings[0].competitor_rankings[i].rank.toString() + "</p>");
          res.write("<p>Ranking Points: " + rankData.rankings[0].competitor_rankings[i].points.toString() + "</p>");

          playerFound = 1;

          break;
        }
      }
      if(playerFound === 0) {
        res.write("Player not found");
      }
      //const playerName = rankData.rankings[0].competitor_rankings[30].competitor.name;
      res.send();

    })
  })
})


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
