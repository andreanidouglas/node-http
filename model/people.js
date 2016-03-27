var _model = require('./model');

function People() {

  this.model = new _model();
  this.name = "";
  this.age = 0;
  this.identifier = 0;
};

People.prototype.setName = function(name)
{
  this.name = name;
};

People.prototype.setAge = function(age)
{
  this.age = age;
};

People.prototype.setIdentifier = function(identifier)
{
  this.identifier = identifier;
};

People.prototype.set = function(person)
{
  this.model.set(person);
}

People.prototype.get = function(identifier, o_callback)
{
  this.model.get(identifier, function(returnedArray){
    o_callback(returnedArray);
  });
}

module.exports = People;
