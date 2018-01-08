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

const dbName = settings.db_name_test;
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

    it('should save valid user', function (done) {
        const userData = UserFactory.random();
        UserModel.create(userData).then(function (user) {
            assert.equal(user.firstName, userData.firstName);
            assert.equal(user.lastName, userData.lastName);
            assert.equal(user.email, userData.email);
            done();
        }).catch(function (err) {
            console.log(err);
            assert();
        });
    }),

    it('should save from UserFactory.createRandom()', () => {
        return UserFactory.createRandom()
        .then(user => {
            return UserModel.findById(user)
        }).then(user => {
            assert(user, "User not created.");
        })
    })

    it('should not save with missing firstName,', function (done) {
        const userData = UserFactory.random();
        delete userData.firstName;

        UserModel.create(userData).then(function (user) {
            console.log("Shouldn't be able to save this user.");
            assert();
        }).catch(function(err) {
            done();
        });
    }),

    it("should not save with invalid email", () => {
        const userData = UserFactory.random();
        userData.email = "email@domain";

        return UserModel.create(userData)
        .then(() => {
            // saved a user with invalid email.
            assert(false)
        }, () => {
            // did not save, so this is correct.
            assert(true);
        });
    }),

    it("should return courses()", function () {
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
    })

    it('should hash passwords', () => {
        const userData = UserFactory.random();
        
        return UserModel.create(userData)
        .then(user => {
            assert.notEqual(userData.password, user.password)
            assert(user.password.length === 59 || user.password.length === 60,
                "Password hash should be 59 or 60 chars.")
            assert.include(user.password, "$2a$", "Password hash should have $2a$")
        })
    })

    // TODO: check on this test to make sure it isn't evergreen
    it('should register with valid credentials', function(done) {
        const userData = UserFactory.random();
        newUser = new UserModel( userData );
        newUser.save( function(err) {

            UserModel.getAuthenticated( userData.email, userData.password, function(err, user, reason) {
                if(err) {
                    console.log(err);
                    assert();
                } 
                else if(user) {
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
                        case reasons.PASS_INCORRECT:
                            console.log("User password not stored correctly");
                        default:
                            console.log("Unknown reason.");
                    }
                    assert();
                }
            });
        }); 
    });

/* TODO: add this test back in
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

