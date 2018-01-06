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

describe('User Model Tests', function() {
  
    before(function (done) {
        mongoose.connect(dbUrl);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('mongoose: connected to '+ dbUrl);
            done();
        });
    }),

    it('New user saved to database', function (done) {
        const userData = UserFactory.random();

        UserModel.create(userData).then(function (user) {
            assert.equal(user.firstName, userData.firstName);
            assert.equal(user.lastName, userData.lastName);
            assert.equal(user.email, userData.email);
            assert.equal(user.password, userData.password);
            done();
        }).catch(function (err) {
            console.log(err);
            assert();
        });
    }),

    it('User missing firstName, not saved.', function (done) {
        const userData = UserFactory.random();
        delete userData.firstName;

        UserModel.create(userData).then(function (user) {
            console.log("Shouldn't be able to save this user.");
            assert();
        }).catch(function(err) {
            done();
        });
    }),

    it("Method for getting the user's courses", function () {
        const userData = UserFactory.random();
        const courseData = CourseFactory.random();
        let user = {};
        let course = {};

        return UserModel.create(userData).then(function (newUser) {
            courseData.user = newUser;
            user = newUser;
            return CourseModel.create(courseData);
        }).then(function (newCourse) {
            course = newCourse;
            return user.courses();
        }).then(function (newCourse) {
            return CourseModel.create(CourseFactory.random(user));
        }).then(function(newCourse) {
            return user.courses();
        }).then(function (courses) {
            assert.equal(courses.length, 2);
            assert.equal(courses[0].name, course.name);
            assert.equal(String(courses[0]._id), String(course._id));
        });
    }),

    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    })
});

