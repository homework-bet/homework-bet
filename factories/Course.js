/*
 * User.js: User creation factory
 */

const faker = require('faker');
const UserFactory = require('./User')
const CourseModel = require('../models/CourseModel')

// returns an object with specified properties suitable 
// for a User entry in the database.
const specified = function (cName, user, sDate, eDate) {
    return {
        name: cName,
        user: user,
        startDate: sDate,
        endDate: eDate,
    };
};

// returns an object with randomly-generated properties suitable 
// for a User entry in the database.
const random = function (user) {
    return {
        name: faker.company.catchPhraseNoun() + " " + Math.ceil(Math.random() * 400),
        user: user,
        startDate: new Date(),  // now
        endDate: new Date(2020, 0), // 1/1/2020 --> months are 0-indexed
    };
}

const createRandom = () => {
    return UserFactory.createRandom()
    .then(user => {
        return createRandomWithThisUser(user)
    })
}

const createRandomWithThisUser = (user) => {
    const courseData = random(user)
    
    return CourseModel.create(courseData)
    .then(course => {
        console.log(`Added ${user.email} to course: ${course._id}`)
        return Promise.resolve(course)
    }).catch(err => {
        return Promise.reject("Course not created.")
    })
}

module.exports = {
    specified: specified,
    random: random,
    createRandom: createRandom,
};

