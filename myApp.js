require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let jane = new Person({ name: "Jane Fonda", age: 84, favoriteFoods: ["eggs"]});
  jane.save((error, data) => {
    if(error){
      console.log(error);
    }else{
      done(null, data);
    }
  })
};

let arrayOfPeople = [
  {name: "John", age: 22, favoriteFoods: ["pizza", "burger"]}, 
  {name: "Jane", age: 22, favoriteFoods: ["noodle"]}, 
  {name: "Jack", age: 22, favoriteFoods: ["rice"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, createdPeople) => {
    if(error){
      console.log(error);
    }else{
      done(null, createdPeople);
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error, arrayOfResults) => {
    if(error){
      console.log(error);
    }else{
      done(null, arrayOfResults)
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (error, resultofFood) => {
    if(error){
      console.log(error);
    }else{
      done(null, resultofFood);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (error, result) => {
    if(error){
      console.log(error);
    }else{
      done(null, result);
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (error, result) => {
    if(error){
      console.log(error);
    }else{
      result.favoriteFoods.push(foodToAdd);
      result.save((error, updatedResult) => {
        if(error){
          console.log(error);
        }else{
          done(null, updatedResult);
        }
      })
    }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (error, data)=>{
    if(error){
      console.log(error);
    }else{
      done(null, data);
    }
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, data)=>{
    if(error){
      console.log(error);
    }else{
      done(null, data);
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (error, data)=>{
    if(error){
      console.log(error);
    }else{
      done(null, data);
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec((error, result) => {
    if(error){
      console.log(error);
    }else{
      done(null, result);
    }
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
