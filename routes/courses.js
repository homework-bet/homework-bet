const express = require('express'),
      router = express.Router(),
      settings = require('../app_settings');

const UserModel = require('../models/UserModel');
const CourseModel = require('../models/CourseModel');

router.get('/', function (req, res) {
    res.render('courses/index', {
        pageTitle: 'Courses',
    });
});

router.get('/new', function (req, res) {
    UserModel.find({})
    .then(users => {
        res.render('courses/new', {
            pageTitle: 'New Course',
            users: users,
        });
    }).catch(err => {
        console.log(err);
    });
});

router.post('/', (req, res) => {
    UserModel.findById(req.body.userId)
    .then(user => {
        const courseData = req.body.course;
        courseData.user = user
        return CourseModel.create(courseData);
    }).then(course => {
        res.redirect('/users/' + String(course.user._id));
    }).catch(err => {
        console.log(err);
        res.redirect('/courses/new');
    });
});

module.exports = router;
