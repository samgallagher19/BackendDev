//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model("Article", articleSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.route("/articles")
.get(function(req, res){
  Article.find({}, function(err, foundArticles){
    if(!err) {
        res.send(foundArticles);
    } else {
      res.send(err);
    }

  })
})
.post(function(req, res){
  console.log(req.body.title);
  console.log(req.body.content);
  const article = new Article ({
    title: req.body.title,
    content: req.body.content
  });
  article.save(function(err){
    if(!err) {res.send("Successfully added a new article.")}
    else {res.send(err)}
  });
  })
  .delete(function(req, res){
    Article.deleteMany({}, function(err){
      if(!err){
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });

app.route("/articles/:title")
.get(function(req, res){
  const requestedArticle = req.params.title;
  console.log(requestedArticle);
  Article.findOne({'title': requestedArticle}, function(err, article){
    if(!err) {
      res.send(article);
    } else {
      res.send(err);
    }
  })
})
.put(function(req, res){
  const requestedArticle = req.params.title;
  console.log(requestedArticle);
  console.log(req.body.title);
  console.log(req.body.content);
  Article.replaceOne(
    {'title': requestedArticle},
    {title: req.body.title, content: req.body.content},
    function(err){
      if(!err) {
        res.send("Successfully update article.");
      }
    })
})
.patch(function(req, res){
  const requestedArticle = req.params.title;
  console.log(requestedArticle);
  Article.updateOne(
    {'title': requestedArticle},
    {$set: req.body},
    function(err){
      if(!err) {
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    });
})
.delete(function(req, res){
  const requestedArticle = req.params.title;
  console.log(requestedArticle);
  Article.deleteOne({'title': requestedArticle}, function(err){
    if(!err) {
      res.send("Successfully deleted article.");
    } else {
      res.send(err);
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
