var http = require("http");
var url = require("url");

function httpServer(){
    this.urlArray = new Array();    
}

httpServer.prototype.createConnection = function(ip, port, callback) {
    this.ip = ip;
    this.port = port;
    this.server = http.createServer(this._connectionHandler);
    this.server.listen(port, ip, this._serverCallback);
    
    callback(this);
};

httpServer.prototype._connectionHandler = function(request, response){
  
  if (!this._selectValidUrl(request.url)){
      this._notValidPath(response, request.url);
  }
  else
  {
    this.request = request;
    this.response = response;
    
    var url_parts = url.parse(request.url, true);
    var call = url_parts.pathname.substring(1, url_parts.pathname.length);
    
    var controller = new peopleController();
    var fn = controller[call];
  
    var paramArray = new Array();
    for (var prop in url_parts.query)
    {
      paramArray.push(url_parts.query[prop]);
    }
    paramArray.push(draw);
    fn.apply(fn, paramArray);
  }
};

httpServer.prototype._serverCallback = function(){
    console.log("Server Running: " + this.ip + ":" + this.port);
};

httpServer.prototype._selectValidUrl = function(url) {
  
  for (var i=0; i<this.urlArray.length;i++)
  {
    if (url.match(this.urlArray[i] + "\?.+") != null)
    {
      return url;
    }
  }
  return null;
};

httpServer.prototype._notValidPath = function(res, url)
{
    res.writeHead(404, 'text/plain');
    res.write("404: Not valid path");
    res.write("\n" + url);
    res.end();

};

module.exports = httpServer;