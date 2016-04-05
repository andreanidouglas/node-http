var sqlite3 = require('sqlite3').verbose();
var resultArray = null;
function database()
{
  this.db = null;
};

database.prototype.init = function()
{
  this.connect();
  this.db.run("CREATE TABLE IF NOT EXISTS people(identifier NUMBER, name TEXT, age NUMBER)");
  this.db.close();
};

database.prototype.connect = function () {
  this.db = new sqlite3.Database('local.db');
};

database.prototype.select = function (identifier, c_callback)
{
  var result = null
  var resultArray = new Array();
  this.connect();
  var db = this.db;

  db.each("SELECT pp.identifier, pp.name, pp.age, ( SELECT MIN(p.identifier) " +
          "                                           FROM people as p " +
          "                                          WHERE p.identifier > pp.identifier  ) as next  " +
          "  FROM people as pp WHERE pp.identifier = ?", identifier, function(err, row){
    result = [row.identifier, row.name, row.age, row.next];
    resultArray.push(result);
    c_callback(resultArray);
  });

  db.close();
};

database.prototype.insert = function(dataArray)
{
  this.connect();
  var db = this.db;
  var fieldNames="";
  var fieldValues="";
  for (var index=0; index<dataArray.length; index++){
      fieldNames += dataArray[index].key + ", ";
      fieldValues += "'" + dataArray[index].value + "'" + ", ";
  }
  sql = "INSERT INTO people ("+ fieldNames.trim().substring(0, fieldNames.length-2) +") VALUES" +
  "(" + fieldValues.trim().substring(0, fieldValues.length-2) + ")";


  db.run(sql, function(err, result){
    if (err)
    {
      console.log(err);
    }
    if(result)
    {
      console.log(result);
    }
  });

};


module.exports = database;
