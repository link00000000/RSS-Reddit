const PORT = 4000;

// Require
var express = require('express');
var jade = require('jade');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express(); // Initializes express

// Middleware
app.set('view engine', 'jade'); // Sets jade as rendering engine
app.use(morgan('dev')); // Enables dev logging with morgan
app.use(bodyParser.urlencoded({ extended: false })); // Body parser parse application/x-www-urlencoded
app.use(bodyParser.json()); // Body parser parse application/json
app.set('views', __dirname + '/views'); // Sets views folder
app.use(express.static(__dirname + '/public')); // Sets public folder

// Returns homepage when / is called
app.get('/', function (req, res) {
    res.render('home');
});

// Express listens for requests to port PORT
app.listen(PORT, function () {
    console.log("Express listening on port " + PORT);
});