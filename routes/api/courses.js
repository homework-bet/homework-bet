const express = require('express');
const router = express.Router();
const settings = require('../../app_settings');
const UserModel = require('../../models/UserModel');
const CourseModel = require('../../models/CourseModel');

// TODO: lock this down to admins?
router.get('/', (req, res) => {
    const currentUser = req.session.user;

    if (!currentUser) {
        // no logged in user
        res.json({ error: "No user logged in." });
    } else {
        CourseModel.find({})
            // find and present all courses
            .then(courses => {
                res.json({ courses: courses });
            }).catch(err => {
                // error finding courses
                console.log(`Course request error: ${err}`);
                res.json({ error: err.errmsg });
            }
        );
    }
});

// TODO: should this be locked down?
router.get('/:courseId', (req, res) => {
    const currentUser = req.session.user;
    const requestCourseId = req.params.courseId;

    if (!currentUser) {
        // no logged in user
        res.json({ error: "No user logged in." });
    } else {
        // find the course and present the info
        CourseModel.findById(String(requestCourseId))
        .then(course => {
            if (course.user == currentUser._id)
                res.json({ course: course });
            else {
                res.json({ 
                    error: "Invalid request: attempt to access course that doesn't below to the current user."
                });
            }
        }).catch(err => {
            console.log(`Course request error: ${err}`);
            res.json({ error: err.errmsg });
        });
    }
});

router.get('/users/current', (req, res) => {
    const currentUser = req.session.user;

    if (!currentUser) {
        // no logged in user
        res.json({ error: "No user logged in." });
    } else {
        // find the user and present the info
        UserModel.findById(currentUser._id).then(user => {
            return user.courses();
        }).then (courses => {
            res.json({ courses: courses });
        }).catch(err => {
            console.log(`Course request error: ${err}`);
            res.json({ error: err.errmsg });
        });
    }
});

module.exports = router;