var router   = require('express').Router();
var myReturn = require('../config/my-return');

router.get('/', function (req, res, next) {
	res.render('pages/index', myReturn);
});

module.exports = router;