var InMemory = function(){
  this.people = new Array();

}

InMemory.prototype.init = function () {
  this.people.push([1, "Douglas", 23]);
  this.people.push([2, "Erica", 42]);

};

InMemory.prototype.select = function (identifier) {

  for(var i=0; i<this.people.length; i++)
  {
    if (this.people[i][0] == identifier)
    {
      return this.people[i];
    }
  }
};

InMemory.prototype.insert = function(dataArray)
{

  for(var i=0; i<dataArray.length;i++);
  {
    console.log(dataArray[i]);
  }

  //this.people.push(resultArray);


}

module.exports = InMemory;
