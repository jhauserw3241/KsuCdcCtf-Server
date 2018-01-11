var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.json([{
		id: 1,
		name: "Challenge 1",
		answer: "Test",
		clue: "This is the first challenge",
		cstatus: "Done"
	},
	{
		id: 2,
		name: "Challenge 2",
		answer: "Test 2",
		clue: "This is the second challenge",
		cstatus: "In Progress"
	}]);
});

module.exports = router;