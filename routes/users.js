const express = require('express'),
      router = express.Router(),
      settings = require('../app_settings'),
      UserModel = require('../models/UserModel'),
      authChecker = require('../helpers/authChecker');

router.get('/', authChecker, function (req, res) {

    UserModel.findById(req.session.user._id).then(function(newUser) {
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

router.get('/new', function (req, res) {
    res.render('users/new', {
        pageTitle: 'Registration',
    });
});

/*
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
*/

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
