const PORT = 4000;

// Require
var express = require('express');
var jade = require('jade');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');
var parseXML = require('xml2js').parseString;

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

// Post request from form
app.post('/', function (req, res) {
    getRSS(req.body.subreddit, res);
});

// Get subreddit from url
app.get('/:subreddit', function (req, res) {
    getRSS(req.params.subreddit, res);
});

// Express listens for requests to port PORT
app.listen(PORT, function () {
    console.log("Express listening on port " + PORT);
});

// Gets RSS and converts it to a javascript object
function getRSS(subreddit, res) {
    request('https://www.reddit.com/r/' + subreddit + '/.rss', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseXML(body, function (error, parsedRSS) {
                if (parsedRSS.feed.title != 'reddit.com: page not found') {
                    res.render('subreddit', {
                        subreddit: parsedRSS.feed.title[0],
                        subtitle: parsedRSS.feed.subtitle[0],
                        comments: parsedRSS.feed.entry
                    });
                } else {
                    res.send('404');
                }
            });
        }
    });
}