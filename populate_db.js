const mongoose = require('./mongoose_connect');
const faker = require('faker');
const CourseModel = require('./models/CourseModel');
const PaymentModel = require('./models/PaymentModel');
const PoolModel = require('./models/PoolModel');
const UserModel = require('./models/UserModel');
const VerificationModel = require('./models/VerificationModel');

const UserFactory = require('./factories/User');
const CourseFactory = require('./factories/Course');

/*
 * populate our db: 
 */

popDatabase();

/* 
 * populates database with one user / course 
 * TODO: make this more robust / complete 
 */

function popDatabase() {
    // create user, save them       
    const user = new UserModel(UserFactory.random());
    
    user.save(function (err, user) {
        if (err) {
            console.log(`error adding user: ${err}.`);
        } 
        else {
            console.log(`User added: ${user.firstName} ${user.lastName}.`);
        }
    });

    const course = new CourseModel( CourseFactory.random( user ) ); 
    course.save(function (err, course) {

        if (err) {
            console.log(`error adding course: ${err}.`);
        } else {
            console.log(`Course added: ${course.name}, with user ${course.user.firstName} ${course.user.lastName}`);
        }

    });
}
