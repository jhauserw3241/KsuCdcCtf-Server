var session = require('express-session');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

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

router.get('/', function(req, res) {
  if (req.session && req.session.user_ud) console.log("Logged in as" + req.session.user_id);
  else console.log("Not logged in.");
  var results = [];
  db.any('select num, name, clue, \'Done\' as cstatus, \'answer?\' as answer from challenges;')
  .then(data => {
    for(var i = 0; i < data.length; i++) {
      results.push({id: data[i].num, name: data[i].name, answer: data[i].answer, clue: data[i].clue, cstatus: data[i].cstatus});
    }
    //console.log(JSON.stringify(results));
    res.json(results);
  });

});

/*
router.get('/:userId&:id&:flag', function(req, res, next) {
	if((req.params.userId == "test") &&
		(req.params.id == "2") &&
		(req.params.flag == "Test 2")) {
		res.json({'cstatus': 'Done'});
	}
	else {
		res.json({'cstatus': 'Fail'});
	}
});
*/

router.get('/:userId&:flag', function(req, res, next) {
  db.any('select submitFlag(\'req.params.userId\', \'req.params.flag\'')
  .then(data => {
    res.json(data[0]);
  });
});

module.exports = router;
