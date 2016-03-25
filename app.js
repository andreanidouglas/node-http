var http = require('http');

var notValidPath = function(res)
{
    res.writeHead(404, 'text/plain');
    res.write("404: Not valid path");
    res.end();

};

var httpHandler = function(request, response){
    if (request.url == "/")
    {
        response.writeHead(200, 'text/html');
        response.write("<html><body><b>Hello World</b></body></html>");
        response.end();
    }
    else
    {
        notValidPath(response);
    }
};

var server = http.createServer(httpHandler);

server.listen(8080);
