const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const settings = require('../app_settings.json');

const UserModel = require('../models/UserModel');
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
        UserModel.create({
            firstName: "Nathan",
            lastName: "Perkins",
        }, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                assert.equal(user.firstName, "Nathan");
                assert.equal(user.lastName, "Perkins");
                done();
            }
        });
    }),

    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    })
});

