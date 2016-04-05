//nodejs modules
var http = require('http');
var url = require('url');

//local modules
var database = require('./persistance/sqlite');
var peopleController = require('./controller/peopleController');
var global_response=null;

var db = new database();
db.init();
urlArray = new Array();
urlArray.push("/add");
urlArray.push("/getPerson");

var draw = function (returnedArray){
  if (returnedArray)
  {
    if (global_response)
    {
      global_response.writeHead(200, 'text/plain');
      for (var i=0;i<returnedArray.length;i++)
      {
          returnArray = returnedArray[i];
          for (var j=0; j<returnArray.length;j++)
          {
            global_response.write(returnArray[j] + ", ");
          }
          global_response.write("end_record\n");
      }
      global_response.write("end_select");
      global_response.end();
    }
    else{
      console.log("No server set for response");
    }
  }
  else{
    global_response.writeHead(200, 'text/plain');
    global_response.write("end");
    global_response.end();
  }

}

var notValidPath = function(res, url)
{
    res.writeHead(404, 'text/plain');
    res.write("404: Not valid path");
    res.write("\n" + url);
    res.end();

};

var selectValidUrl = function(url){
  var i=0;

  for (i=0; i<urlArray.length;i++)
  {
    if (url.match(urlArray[i] + "\?.+") != null)
    {
      return url;
    }
  }
  return null;
}

var httpHandler = function(request, response){
  global_response = response;
  if (!selectValidUrl(request.url)){
      notValidPath(response, request.url);
  }
  else
  {
    var url_parts = url.parse(request.url, true);
    var call = url_parts.pathname.substring(1, url_parts.pathname.length);
    var controller = new peopleController();
    var fn = controller[call];


    paramArray = new Array();
    for (var prop in url_parts.query)
    {
      paramArray.push(url_parts.query[prop]);
    }
    paramArray.push(draw);
    fn.apply(fn, paramArray);
  }
};

var server = http.createServer(httpHandler);
server.listen(8080, function(){
  console.log("Listening on: 8080");
});
