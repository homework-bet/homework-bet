const express = require('express'),
      router = express.Router(),
      settings = require('../app_settings'),
      UserModel = require('../models/UserModel');

router.get('/', function (req, res) {
    UserModel.find({}, function (err, users) {
        if (err) {
            console.log(`User request error: ${err}`);
            res.redirect(`/users`);
        } else {
            console.log(users);
            res.render('users/index', {
                users: users,
                pageTitle: "Users",
            });
        }
    });
});

router.get('/new', function (req, res) {
    res.render('users/new', {
        pageTitle: 'Registration',
    });
});

router.get('/:userId', function (req, res) {
    UserModel.findById(req.params.userId, function(err, user) {
        if (err) {
            console.log(`User request error: ${err}`);
            res.redirect(`/users`);
        } else {
            console.log(user);
            res.render('users/show', {
                user: user,
                courses: [], // TODO: add courses
                pageTitle: `${user.firstName} ${user.lastName}`,
            })
        }
    });
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

module.exports = router;