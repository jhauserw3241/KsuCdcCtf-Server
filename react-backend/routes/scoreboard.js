var express = require('express');
var router = express.Router();

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

module.exports = router;