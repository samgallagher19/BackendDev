//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var lodash = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', function(req, res){
  res.render('home', {startingContent: homeStartingContent, posts: posts});

})

app.get('/contact', function(req, res){
  res.render('contact', {startingContent: contactContent});
})

app.get('/about', function(req, res){
  res.render('about', {startingContent: aboutContent});
})

app.get('/compose', function(req, res){
  res.render('compose', {startingContent: aboutContent});
})

app.get('/posts/:title', function(req, res){
  //console.log(req.params.title);
  var found = 0;
  for(var i = 0; i < posts.length; i++) {
    if(lodash.lowerCase(posts[i].title) == lodash.lowerCase(req.params.title)) {
      res.render('post', {title: posts[i].title, post: posts[i].post});
    }
  }
  if(found) {
    console.log("Match found!");
  }
})

app.post('/compose', function(req, res){
  console.log(lodash.kebabCase(req.body.newTitle));
  const kebabTitle = lodash.kebabCase(req.body.newTitle);
  posts.push({title: req.body.newTitle, post: req.body.newPost, kebabTitle: kebabTitle});
  //, linkTitle: lodash.replace(lodash.lowerCase(req.body.newTitle), ' ', '-')
  res.redirect('/');
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
