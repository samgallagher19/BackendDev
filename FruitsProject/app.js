const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    //required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  rating: 8,
  review: "Peaches are yummy."
});

const blueberry = new Fruit ({
  name: "Blueberry",
 rating: 9,
 review: "Pretty Awesome YES!"
});

blueberry.save();
//
const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);
//
// const person = new Person ({
//   name: "Jamie",
//   age: 13,
//   favoriteFruit: crabapple
// })
//
// person.save();


//
// const orange = new Fruit ({
//   name: "Orange",
//   rating: 4,
//   review: "Too sour for me"
// });
//
// const banana = new Fruit ({
//   name: "Banana",
//   rating: 3,
//   review: "weird texture"
// });

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });



Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else {

    // mongoose.connection.close(function () {
    //         process.exit(0);
    // });

    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });

  }

});

//
Person.updateOne({name: "Sam"}, {favoriteFruit: blueberry}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated the document.");
  }
});
//
// Fruit.deleteOne({_id: "624c9d8395074bb9b6471525"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the entry with no name");
//   }
// });
//
// Person.deleteMany({name: "Sam"}, function(err){
//   if (err) {
//        console.log(err);
//      } else {
//        console.log("Successfully deleted all Sams");
//      }
// });
