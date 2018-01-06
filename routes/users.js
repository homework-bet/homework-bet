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
    let user = {};

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