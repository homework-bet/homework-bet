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

    it('User register with valid credentials', function(done) {
        const userData = UserFactory.random();
        newUser = new UserModel( userData );
        newUser.save( function(err) {

            UserModel.getAuthenticated( userData.email, userData.password, function(err, user, reason) {
                if(err) {
                    done();
                } 
                else if(user) {
                    console.log("User registered and stored in database");
                    assert.equal(user.firstName, userData.firstName);
                    assert.equal(user.lastName, userData.lastName);
                    assert.equal(user.email, userData.email);
                    done();
                }
                else {
                    var reason = UserModel.failedLogin;
                    switch(reason) {
                        case reasons.NOT_FOUND:
                            console.log("User not found in database");
                            done();
                            break;
                        case reasons.PASS_INCORRECT:
                            console.log("User password not stored correctly");
                            done();
                            break;
                    }
                }
            });

        }); 
    });

/*
    it('User registers with existing credentials', function(done) {
        const userData = UserFactory.specified( 'foo', 'bar', 'foo@foo.com', 'secret' );
        newUser = new UserModel( userData );
        newUser.save( function(err) {

            // now create a dup. user (same email)
            userData.firstName = 'boo';
            userData.lastName = 'mar'
            dupUser = new UserModel( userData );

            dupUser.save( function(err) {
                
                UserModel.getAuthenticated( userData.email, userData.password, function(err, user, reason) {
                    if(err) {
                        console.log("Duplicate User not registered.");
                        done();
                    } 
                    else if(user) {
                        console.log("Duplicate User registered and stored in database");
                        assert(user.email !== newUser.email);
                        done();
                    }
                    else {
                    
                        var reason = UserModel.failedLogin;
                        switch(reason) {
                            case reasons.NOT_FOUND:
                                console.log("Duplicate user not found in database");
                                done();
                                break;
                            case reasons.PASS_INCORRECT:
                                console.log("Duplicate user password not stored correctly");
                                done();
                                break;
                        }
                    }
                });

            });
        });
    });
*/

    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    })
});

