const mongoose = require('./mongoose_connect');
const faker = require('faker');
const CourseModel = require('./models/CourseModel');
const PaymentModel = require('./models/PaymentModel');
const PoolModel = require('./models/PoolModel');
const UserModel = require('./models/UserModel');
const VerificationModel = require('./models/VerificationModel');

const UserFactory = require('./factories/User');
const CourseFactory = require('./factories/Course');
const PoolFactory = require('./factories/Pool')


PoolFactory.createPools(2018, 100, 5)
.then(pools => {
    console.log("Pools created.")
}).catch(err => {
    console.log("Pools not created.")
});
