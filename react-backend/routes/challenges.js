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

// Return name, number, clue if completed, and status (completed/in progress)

module.exports = router;
