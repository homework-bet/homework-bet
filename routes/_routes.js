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
router.use('/courses', poolRoutes);
router.use('/payments', paymentRoutes);
router.use('/verifications', verificationRoutes);

module.exports = router;