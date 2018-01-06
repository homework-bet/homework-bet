const express = require('express'),
      router  = express.Router(),
      settings = require('../app_settings'),
      userRoutes = require('./users'),
      courseRoutes = require('./courses'),
      paymentRoutes = require('./payments'),
      verificationRoutes = require('./verifications'),
      poolRoutes = require('./pools');

const appName = settings.app_name;

router.get('/', function (req, res) {
    res.render('home', {
        appName: appName,
        pageTitle: 'Home',
    });
});

router.get('/register', function (req, res) {
    res.redirect('/users/new');
});

router.get('/login', function (req, res) {
    res.render('login', {
        appName: appName,
        pageTitle: "Login",
    });
});

router.use('/users', userRoutes);
router.use('/pools', poolRoutes);
router.use('/courses', courseRoutes);
router.use('/payments', paymentRoutes);
router.use('/verifications', verificationRoutes);

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