const express = require('express'),
      router = express.Router(),
      settings = require('../app_settings');

const UserModel = require('../models/UserModel');
const CourseModel = require('../models/CourseModel');
const authChecker = require('../helpers/authChecker');

router.get('/', authChecker, function (req, res) {

    res.render('courses/index', {
        pageTitle: 'Courses',
    });
});

router.get('/new', authChecker, function (req, res) {
    UserModel.findById(req.session.user._id)
    .then(users => {
        res.render('courses/new', {
            pageTitle: 'New Course',
            user: user,
        });
    }).catch(err => {
        console.log(err);
    });
});

router.post('/', authChecker, (req, res) => {
    UserModel.findById(req.body.userId)
    .then(user => {
        const courseData = req.body.course;
        courseData.user = user;
        return CourseModel.create(courseData);
    }).then(course => {
        res.redirect('/users/' + String(course.user._id));
    }).catch(err => {
        console.log(err);
        res.redirect('/courses/new');
    });
});

module.exports = router;
