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
const PoolModel = require('../models/PoolModel');
const PoolFactory = require('../factories/Pool');

const dbName = settings.db_name_test;
const dbUrl = settings.db_host + dbName;

describe('Pool Model Tests', function () {

    before(function (done) {
        mongoose.connect(dbUrl);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('mongoose: connected to ' + dbUrl);
            done();
        });
    })

    it('should save a valid pool to the database.', () => {
        const poolData = PoolFactory.random();

        return PoolModel.create(poolData)
        .then(pool => {
            assert.equal(Date(pool.startDate), Date(poolData.startDate));
            assert.equal(Date(pool.endDate), Date(pool.endDate));
        });
    })

    it('should hold a course.', () => {
        const userData = UserFactory.random();
        const courseData = CourseFactory.random({});

        return UserModel.create(userData)
        .then(user => {
            courseData.user = user;
            return CourseModel.create(courseData);
        }).then(course => {
            const poolData = {
                courses: [course],
                startDate: course.startDate,
                endDate: course.endDate,
            };

            return PoolModel.create(poolData);
        }).then(pool => {
            course = pool.courses[0];
            assert.equal(course.name, courseData.name);
            assert.equal(course.startDate, courseData.startDate);
            assert.equal(course.endDate, courseData.endDate);
        });
    })

    it('should work with PoolFactory.generateYear()', () => {
        poolDataArray = PoolFactory.generateYear(2018)
        const promises = poolDataArray.map(poolData => PoolModel.create(poolData))

        return Promise.all(promises).then(pools => {
            assert(pools.length === 4);
            
            pools.forEach(pool => {
                assert.equal(String(pool._id).length, 24)
                assert(pool.startDate instanceof Date)
                assert(pool.endDate instanceof Date)
                assert.equal(pool.startDate.getFullYear(), 2018)
            });
        });
    })

    it('should have a betAmount field with a default of 25', () => {
        const poolData = PoolFactory.random()

        return PoolModel.create(poolData)
        .then(pool => {
            assert.equal(pool.betAmount, 25, "New pools should have a betAmount of $25 by default.")
        })
    })

    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    })
});
