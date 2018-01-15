var express = require('express');
var router = express.Router();

router.get('/:username&:password', function(req, res, next) {
	if((req.params.username === "loganprough") &&
		(req.params.password === "loganprough")) {
//    req.session.user_id = "test"; 
		res.json({'success': true});
	}
	else {
		res.json({'success': false});
	}
});

module.exports = router;
