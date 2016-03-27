var database = require('../persistance/sqlite');

function Model() {
  this.modelAttributes = Array();
};


Model.prototype.set = function(obj){

  var mappingArr = new Array();
  var index=0;

  for (var property in obj){
    if (obj.hasOwnProperty(property)) {
      if (property != "model"){
        mappingArr.push({key: property, value: obj[property]})
      }
    }
  }

  db = new database();
  db.insert(mappingArr);
};

Model.prototype.get = function(identifier, a_callback){
  var db = new database();
  var resultArray = db.select(identifier, function(returnedArray){
    a_callback(returnedArray);
  });
};





module.exports = Model;
