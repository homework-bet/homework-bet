const express = require('express'),
      router = express.Router(),
      settings = require('../app_settings'),
      UserModel = require('../models/UserModel'),
      authChecker = require('../helpers/authChecker');

// TODO: lock this down to admins only
router.get('/', authChecker, (req, res) => {
    UserModel.find({})
    .then((users) => {
        res.render('users/index', {
            users: users,
            pageTitle: "Users",
        });
    }).catch(err => {
        console.log(`User request error: ${err}`);
        res.redirect(`/users`);
    });
});

router.get('/new', (req, res) => {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('users/new', {
            pageTitle: 'Registration',
        });
    }
});

router.get('/:userId', authChecker, function (req, res) {
    let user = {};

    // only allow permitted user to see this page 
    if( req.params.userId == req.session.user._id ) {
        UserModel.findById(req.params.userId).then(function(newUser) {
            user = newUser;
            return user.courses();
        }).then(function (courses) {
            res.render('users/show', {
                user: user,
                courses: courses,
                pageTitle: `${user.firstName} ${user.lastName}`,
            });
        }).catch(function (err) {
            console.log(`User request error: ${err}`);
            res.redirect(`/users`);
        });
    }
    else {  
        console.log('attempt to access without credentials');
        res.redirect(`/users`);
    }
});

router.post('/', function (req, res) {
    UserModel.create(res.body.user, function(err, user) {
        if (err) {
            console.log(`New user error: ${err}`);
            res.redirect(`/users/new`);
        } else {
            res.redirect(`/users/${user.id}`);
        }
    });
});

router.post('/login', function (req, res, next) {

    UserModel.getAuthenticated(req.body.email, req.body.password, function (err, user, reason) {
        if (err) {
            res.render('users/login', {
                appName: appName,
                pageTitle: "Login",
                error: 'An error occurred.'
            });
        }

        else if (user) {
            req.session.user = user;
            req.flash('success', req.session.user.email + ' logged in!');
            res.redirect('/');
        }

        // handle user not found / invalid pass. similarly
        else {
            res.render('users/login', {
                appName: appName,
                pageTitle: "Login",
                error: 'Invalid login credentials'
            });
        }
    });
});

router.post('/new', function (req, res) {

    var user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
    });

    user.save(function (err, data) {
        if (err) {
            console.log(err.errmsg);
            res.render('register', {
                pageTitle: "Register",
                error: err.errmsg
            });
        }
        else {
            req.session.user = user;
            req.flash('success', req.session.user.email + ' logged in!');
            res.redirect('/');
        }
    });
});

module.exports = router;
