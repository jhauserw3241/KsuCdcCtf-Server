var express = require('express');
var router = express.Router();

/*
router.get('/', function(req, res, next) {
	res.json([{
		id: 1,
		name: "jhauser",
		score: "45"
	},
	{
		id: 2,
		name: "flemingcaleb",
		score: "70"
	},
	{
		id: 3,
		name: "richardp",
		score: "90"
	}]);
});
*/

// Return eids and total points
router.get('/scoreboard', function(req, res) {
  var results = [];
  db.any('select eid, score from users order by score desc;')
  .then(data => {
    for(var i = 0; i < data.length; i++) {
      results.push({eid: data[i].eid, score: data[i].score});
    }
    console.log(JSON.stringify(results));
    res.contentType('application/json');
    res.send(JSON.stringify(results));
  });
  
});

module.exports = router;
