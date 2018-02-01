'use strict';
var session = require('client-sessions');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pgp = require('pg-promise')();
var ldap = require('ldapjs');

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

app.use(session({
  cookieName: 'session',
  secret: 'CHANGEME',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
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

// Ignore invalid AD cert signature
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

app.get('/challenges', function(req, res) {
  var results = [];
  db.any('select num, name, clue, points, case name when (select challenge from users where eid = $1) then \'In Progress\' else \'Done\' end as cstatus from challenges where num <= currentNum($1);', [req.session.user])
  .then(data => {
    for(var i = 0; i < data.length; i++) {
		console.log(data[i].points);
      results.push({id: data[i].num, name: data[i].name, points: data[i].points, clue: data[i].clue, cstatus: data[i].cstatus});
    }
    res.json(results);
  });
});

app.post('/submit/:flag', function(req, res) {
  db.any('select submitFlag($1, $2) as status;', [req.session.user, req.params.flag])
  .then(data => {
    res.json(data[0]);
  })
  .catch(function (error) {
    res.json({'status': 'Error connecting to database.'});
  });
});

app.post('/login/:username&:password', function(req, res) {
  var adClient = ldap.createClient({ url: "ldaps://ad.ksucdc.org" });
  adClient.bind(req.params.username + "@infra.ksucdc.org", req.params.password, function(err) {
    if (err != null) res.json({'success': 'false'});
    else {
	  	req.session.user = req.params.username;
	    res.json({'success': 'true'});
      db.any('select addUser($1);', [req.session.user]);  
    }
  });
  /*
	if (req.params.username === req.params.password) {
		req.session.user = req.params.username;
		res.json({'success': 'true'});
		console.log("Successful login as " + req.session.user);
    db.any('select addUser($1);', [req.session.user]);  
	}
	else res.json({'success': 'false'});*/
});

app.post('/signout', function(req, res) {
	req.session.user = "";
	res.json({'success': 'true'});
});

// Return eids and total points
app.get('/scoreboard', function(req, res) {
  var results = [];
  db.any('select eid, score, (select string_agg(name, ', ') from challenges where num < currentNum(eid)) as completed from users order by score desc;')
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
