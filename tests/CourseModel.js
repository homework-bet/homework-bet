const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const settings = require('../app_settings.json');

const UserModel = require('../models/UserModel');
const UserFactory = require('../factories/User');
const CourseModel = require('../models/CourseModel');
const CourseFactory = require('../factories/Course');

const dbName = settings.db_name_test || "homework-bet-test";
const dbUrl = settings.db_host + dbName;

describe('Course Model Tests', function () {

    before(function (done) {
        mongoose.connect(dbUrl);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('mongoose: connected to ' + dbUrl);
            done();
        });
    }),

    it('Valid course saved to database', function (done) {
        const userData = UserFactory.random()
        const user = new UserModel(userData);
        user.save(function (err, user) {
            if (err) {
                console.log(err);
                assert();
            }
        });

        const courseData = CourseFactory.random(user);
        const course = new CourseModel(courseData);

        course.save(function(err, course) {
            if (err) {
                console.log(err);
                assert();
            } else {
                assert.equal(course.name, courseData.name);
                done();
            }
        });
    }),

        it('Course with no user fails to save.', function (done) {
            const courseData = CourseFactory.random({});
            const course = new CourseModel(courseData);

            course.save(function (err, course) {
                if (err) {
                    done();
                } else {
                    console.log("Course without user should not have saved.");
                    assert();
                }
            });
        }),

    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    })
});
