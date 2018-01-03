var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.json([{
		id: 1,
		name: "Joy Hauser",
		ok: true
	},
	{
		id: 2,
		name: "Test User",
		ok: true
	}]);
});

module.exports = router;
