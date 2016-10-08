var express = require('express');
var app = express();


var logger = require('morgan'); //used to log in console window all request
var cookieParser = require('cookie-parser'); //Parse Cookie header and populate req.cookies
var bodyParser = require('body-parser'); //allows the use of req.body in POST request

var http = require('http').Server(app);
var io = require('./sockets').listen(http) //allows for sockets on the HTTP server instance
var port = process.env.PORT || 3000;

//-------------------------Express JS configs-----------------------------//
// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', function(req, res) {
 res.sendFile(__dirname + '/public/default.html');

});


//Used to test the server is up and running
//also to teach how Express and ejs work
app.get('/HelloWorld/:color', function(req, res, next) {
    
    var backgroundColor = req.params.color || "white"; //defaults if no param is passed
    
    res.render('HelloWorld', {
        message: "Server is up and running",
        color: backgroundColor        
    });   
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