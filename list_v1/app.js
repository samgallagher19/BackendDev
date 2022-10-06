
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
const workItems = [];

app.use(express.urlencoded());
app.use(express.static("public"));

app.set("view engine", 'ejs');

app.get("/", function(req,res){
  const day = date.getDay();

  res.render("list", {listTitle: day, newItems: items});
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newItems: workItems});
})

app.get("/about", function(req,res){
  res.render("about");
})

app.post("/", function(req, res) {
  console.log(req.body);
  const item = req.body.listItem;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }


})

app.listen(3000, function(){
  console.log("Listening on port 3000");
})
