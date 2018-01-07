const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const settings = require('../app_settings.json');

const moment = require('moment');
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
        const userData = UserFactory.random();
        const courseData = CourseFactory.random({});

        UserModel.create(userData).then(function (user) {
            courseData.user = user;
            return CourseModel.create(courseData);
        }).then(function (course) {
            assert.equal(course.name, courseData.name);
            done();
        }).catch(function (err) {
            console.log(err);
            assert();
        });
    }),

    it('Course with no user fails to save.', function (done) {
        const courseData = CourseFactory.random({});
        const course = new CourseModel(courseData);

        CourseModel.create(courseData).then(function (course) {
            console.log("Saved invalid course!");
            assert();
        }).catch(function (err) {
            done();
        });
    }),

    it("shouldn't save a course with endDate preceeding startDate", () => {
        const userData = UserFactory.random();
        const courseData = CourseFactory.random({});
        
        courseData.startDate = moment().add(1, 'days');
        courseData.endDate = moment();

        return UserModel.create(userData)
        .then((user) => {
            courseData.user = user;
            return CourseModel.create(courseData)
        }).then(() => {
            console.log("Course with invalid dates was saved.");
            assert(false)
        }, (err) => {
            assert(true)
        });
    }),

    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    })
});
