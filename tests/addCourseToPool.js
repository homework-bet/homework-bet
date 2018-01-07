const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const settings = require('../app_settings.json');

const dbName = settings.db_name_test;
const dbUrl = settings.db_host + dbName;

const CourseModel = require('../models/CourseModel');
const CourseFactory = require('../factories/Course');
const PoolModel = require('../models/PoolModel');
const addCourseToPool = require('../helpers/addCourseToPool');

describe('addCourseToPool Tests', function () {

    before(function (done) {
        mongoose.connect(dbUrl);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('mongoose: connected to ' + dbUrl);
            done();
        });
    }),

    it('should create a pool, if none exists', () => {
        const courseData = CourseFactory.random({});
        const course = new CourseModel(courseData);

        return addCourseToPool(course)
        .then(pool => {
            assert.equal(Date(pool.startDate), Date(courseData.startDate));
        });
    }),

    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    })
});
