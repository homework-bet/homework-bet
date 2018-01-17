const express = require('express');
const router  = express.Router();

const apiRoutes = require('./_api');
router.use('/api', apiRoutes);

/* Route handler for 404 - page not found */
router.use(function(req, res) {
	res.status(404);
	res.render('404');
});

/* Route handler for 500 - server error */
router.use(function(err, req, res, next) {
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});

module.exports = router;
