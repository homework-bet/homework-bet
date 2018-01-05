const mongoose = require('./mongoose_connect');
const faker = require('faker');

const CourseModel = require('./models/CourseModel');
const PaymentModel = require('./models/PaymentModel');
const PoolModel = require('./models/PoolModel');
const UserModel = require('./models/UserModel');
const VerificationModel = require('./models/VerificationModel');

function addFakeUser() {
    const user = new UserModel({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
    });

    user.save(function (err, user) {
        if (err) {
            console.log(`addFakeUser error: ${err}.`);
        } else {
            console.log(`User added: ${user.firstName} ${user.lastName}.`);
        }
    });

    const courseName = faker.company.catchPhraseNoun() + " " + Math.ceil(Math.random() * 400);

    const course = new CourseModel({
        name: courseName,
        user: user,
    });

    console.log(user);
    console.log(course);
    
    course.save(function (err, course) {
        if (err) {
            console.log(`addFakeUser error: ${err}.`);
        } else {
            console.log(`Course added: ${course.name}.`);
        }
    });
}

// for(let i = 0; i < 25; i++) {
    addFakeUser();
// }