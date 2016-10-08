var express = require('express');
var app = express();

var logger = require('morgan'); //used to log in console window all request
var cookieParser = require('cookie-parser'); //Parse Cookie header and populate req.cookies
var bodyParser = require('body-parser'); //allows the use of req.body in POST request

var http = require('http').Server(app); //Node.js module creates an instance of HTTP to make calls to Pi
var io = require('./sockets').listen(http) //allows for sockets on the HTTP server instance
var port = process.env.PORT || 3000; //Grabs port number from enviroment for things like Azure, otherwise port 3000

https://switchitdb.documents.azure.com:443/
var mongoURI = "mongodb://127.0.0.1:27017/SwitchIT"; //localhost:defaultPort/dataBase
//sets up Mongoose
var mongoose = require('mongoose'); //added for Mongo support
var MongooseDB = mongoose.connect(mongoURI).connection; //makes connection
MongooseDB.on('error', function(err) { console.log(err.message); console.log("Is MongoDB Running?"); });
MongooseDB.once('open', function() {
  console.log("mongooseDB connection open");
});
      
//-------------------------getting funtions/routes from other files-----------------------------//
//api to mongoose calls
var api = require('./routes/api');

//-------------------------Express JS configs-----------------------------//
// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

//-------------------------ROUTES-----------------------------//
app.use('/api', api); //sets the API used to access the Database

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


http.listen(port, function() {
    console.log('listening on *: ' + port);
});