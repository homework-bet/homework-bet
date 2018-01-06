const express = require('express'),
      router  = express.Router(),
      session = require('express-session'),
      UserModel = require('../models/UserModel'),
      settings = require('../app_settings'),
      userRoutes = require('./users'),
      courseRoutes = require('./courses'),
      paymentRoutes = require('./payments'),
      verificationRoutes = require('./verifications'),
      poolRoutes = require('./pools');
//    bcrypt = require('bcryptjs'),

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


/*
router.post('/register', function(req, res) {
    // note that we're using bcrypt here to hash our password
    var user = new User({
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        password = bcrypt.hashSync(req.body.password, 10), 
        email = req.body.email,
    });

    user.save( function(err, res) {
        if(err) {
            console.log(err);
            res.redirect('/');
        }
    });

});
*/


router.get('/login', function (req, res) {
    res.render('login', {
        appName: appName,
        pageTitle: "Login",
    });
});

router.post('/login', function(req, res, next) {

    // email should be unique
    UserModel.findOne({email: req.body.email}, function(err, user) {

        if(err) {
            res.render('login', {   appName: appName,
                                    pageTitle: "Login",
                                    error: 'An error occurred.' } );

            /*
            return res.status(500).json({
                title: 'An error occurred.',
                error: err
            });    
            */
        }
        else if (!user) {
            res.render('login', {   appName: appName,
                                    pageTitle: "Login",
                                    error: 'Invalid login credentials' });

            /*
            return res.status(401).json({
                title: 'Login not successful.',
                error: {message: 'Invalid login credentials'}
            });
            */
        }
 //     else if( !(bcrypt.compareSync(req.body.password, user.password)) )
        else if( !(req.body.password === user.password) ) {
            res.render('login', {   appName: appName,
                                    pageTitle: "Login",
                                    error: 'Invalid login credentials' });

            /*
            return res.status(401).json({
                title: 'Login not successful.',
                error: {message: 'Invalid login credentials'}
            });
            */
        }

        // otherwise, save session and redirect to main page 
        else {
            req.session.user = user;
            res.redirect('/');            
        }
    });
});


router.use('/users', userRoutes);
router.use('/pools', poolRoutes);
router.use('/courses', poolRoutes);
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
