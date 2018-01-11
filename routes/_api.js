const express = require('express')
const router = express.Router()
const settings = require('../app_settings')

const appName = settings.app_name;

const UserModel = require('../models/UserModel')

router.get('/register', function (req, res) {
    res.json({
        appName: appName,
        pageTitle: "Register"
    });
});

router.post('/register', function (req, res) {

    var user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
    });

    user.save(function (err, data) {
        if (err) {
            console.log(err.errmsg);
            res.json({
                appName: appName,
                pageTitle: "Register",
                error: err.errmsg
            });
        }
        else {
            req.session.user = user;
            res.json({
                appName: appName,
                pageTitle: "Register",
                message: 'success,' + req.session.user.email + ' logged in!'
            });
        }
    });  
});

router.get('/login', function (req, res) {
    res.json({
        appName: appName,
        pageTitle: "Login"
    });
});

router.post('/login', function (req, res, next) {

    // email should be unique
    UserModel.getAuthenticated(req.body.email, req.body.password, function (err, user, reason) {
        if (err) {
            res.json({
                appName: appName,
                pageTitle: "Login",
                error: 'An error occurred.'
            });
        }

        else if (user) {
            req.session.user = user;
            res.json({
                appName: appName,
                pageTitle: "Login",
                message: 'success,' + req.session.user.email + ' logged in!'
            });
        }

        // handle user not found / invalid pass. similarly
        else {
            res.json({
                appName: appName,
                pageTitle: "Login",
                error: 'Invalid login credentials'
            });
        }
    });
});

router.get('/logout', (req, res) => {
    if (req.session.user) {
        const userEmail = req.session.user.email;
        delete req.session.user; // TODO: detemine if it is safe to logout this way.
        res.json({
            message: `success: ${userEmail} logged out.`,
        });
    } else {
        res.json({
            message: `warning: No user was logged in.`,
        })
    }
});

router.use('/users', require('./api/users'));
router.use('/courses', require('./api/courses'));
router.use('/pools', require('./api/pools'));

module.exports = router;
