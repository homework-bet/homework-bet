const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const settings = require('../app_settings.json');

const UserModel = require('../models/UserModel');
const UserFactory = require('../factories/User')

const dbName = settings.db_name_test || "homework-bet-test";
const dbUrl = settings.db_host + dbName;

describe('User Tests', function() {

    before(function (done) {
        mongoose.connect(dbUrl);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('mongoose: connected to '+ dbUrl);
            done();
        });
    }),

    it('New user saved to database', function(done) {
        const userData = UserFactory.random();
        UserModel.create(
            userData, function(err, user) {
            if (err) {
                console.log(err);
                assert();
            } else {
                assert.equal(user.firstName, userData.firstName);
                assert.equal(user.lastName, userData.lastName);
                assert.equal(user.email, userData.email);
                assert.equal(user.password, userData.password);
                done();
            }
        });
    }),

    it('User missing firstName, not saved.', function (done) {
        const userData = UserFactory.random();
        delete userData.firstName;

        UserModel.create(
            userData, function (err, user) {
                if (err) {
                    done();
                } else {
                    console.log("User created without firstName");
                    assert();
                }
            }
        );
    }),

    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    })
});

