var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var io = require('./sockets').listen(http) //allows for sockets on the HTTP server instance
var port = process.env.PORT || 3000;

var lobbyUsers = {};
var users = {};
var activeGames = {};

app.get('/', function(req, res) {
 res.sendFile(__dirname + '/public/default.html');

});



io.on('connection', function(socket) {
    console.log('new connection ' + socket);
    
    
    socket.on('disconnect', function(msg) {
        
      console.log(msg);
    });
      
   
    
           
});

http.listen(port, function() {
    console.log('listening on *: ' + port);
});