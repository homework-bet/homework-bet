const express = require('express'),
      router  = express.Router(),
      session = require('express-session'),
      UserModel = require('../models/UserModel'),
      settings = require('../app_settings'),
      userRoutes = require('./users'),
      courseRoutes = require('./courses'),
      paymentRoutes = require('./payments'),
      verificationRoutes = require('./verifications'),
      poolRoutes = require('./pools'),
      bcrypt = require('bcryptjs');
      authChecker = require('../helpers/authChecker');

const appName = settings.app_name;

router.get('/', function (req, res) {
    res.render('home', {
        appName: appName,
        pageTitle: 'Home',
        currentUser: req.session.user,
    });
});

/*
 * registration routes
 */ 

router.get('/register', function (req, res) {
    res.redirect('/users/new');
});

/*
 * login routes
 */ 

router.get('/login', function (req, res) {
    res.render('users/login', {
        appName: appName,
        pageTitle: "Login",
    });
});

router.get('/logout', (req, res) => {
    if (req.session.user) {
        const userEmail = req.session.user.email;
        delete req.session.user; // TODO: detemine if it is safe to logout this way.
        req.flash('success', userEmail + ' logged out.');
    } else {
        req.flash('warning', 'No user was logged in.');
    }
    res.redirect('/');
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
