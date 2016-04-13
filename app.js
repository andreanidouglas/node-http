var httpServer = require("./httpServer.js");
var config = require("./config.json");

var server = new httpServer();
server.createConnection(config.server.ip, config.server.port, connection);

var connection = function(server){
    
};