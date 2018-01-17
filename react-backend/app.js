//var session = require('client-sessions');
var session = require('express-session');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pgp = require('pg-promise')();

var app = express();

// view engine setup
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(session({
  cookieName: 'session',
  secret: 'CHANGEME',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));*/

app.use(session({
	secret: 'keyboard cat',
	cookie: {}
}));

// Database connecty code
var cn = {
  host: 'localhost',
  port: 5432,
  database: 'scoreboard',
  user: 'postgres',
  password: 'CHANGEME'
};

var db = pgp(cn);
db.connect()
    .then(function (obj) {
        obj.done();
        console.log("successful connection to db");
    })
    .catch(function (error) {
        console.log("ERROR:", error.message || error);
});

app.get('/', function (req, res) {
  res.redirect('/scoreboard');
});

app.get('/challenges', function(req, res) {
  console.log("Logged in as " + req.session.user_id);
  var results = [];
  db.any('select num, name, clue, \'Done\' as cstatus from challenges;')
  .then(data => {
    for(var i = 0; i < data.length; i++) {
      results.push({id: data[i].num, name: data[i].name, answer: data[i].answer, clue: data[i].clue, cstatus: data[i].cstatus});
    }
    res.json(results);
  });

});

app.post('/submit/:userId&:flag', function(req, res, next) {
  db.any('select submitFlag(\'req.params.userId\', \'req.params.flag\'')
  .then(data => {
    res.json(data[0]);
  });
});

app.post('/login/:username&:password', function(req, res) {
	
  if((req.params.username === "loganprough") &&
		(req.params.password === "loganprough")) {
	console.log("Before DB call");
    db.any('select 12 as number;')
    .then(data => {
		req.session.user_id = data[0].number; //data[0].id;
		res.json({'success': 'true'});
		console.log("Successful login as " + req.session.user_id);
    })
	.catch(error => {
		res.json({'success': 'Something went wrong when trying to login'});
	});

    /*
    req.session.user = req.params.username;
    console.log("Successful login as " + req.session.user);
    res.json({'success': 'true'});
    */
	}
  else res.json({'success': 'false'}); 
});

// Return eids and total points
app.get('/scoreboard', function(req, res) {
  var results = [];
  db.any('select eid, score from users order by score desc;')
  .then(data => {
    for(var i = 0; i < data.length; i++) {
      results.push({eid: data[i].eid, score: data[i].score});
    }
    res.json(results);
  });

});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
