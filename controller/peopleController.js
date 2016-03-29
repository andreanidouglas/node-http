var people = require('../model/people');

function PeopleController() {}

PeopleController.prototype.add = function(name, age, identifier, w_callback)
{
  var person = new people();

  person.setName(name);
  person.setAge(age);
  person.setIdentifier(identifier);
  person.set(person);

  w_callback(null);
};

PeopleController.prototype.getPerson = function(identifier, g_callback)
{
  return (new people().get(identifier, function(returnedArray){
    g_callback(returnedArray);
  }));

};

module.exports = PeopleController;
