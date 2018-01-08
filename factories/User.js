/*
 * User.js: User creation factory
 */

const faker = require('faker');
const UserModel = require('../models/UserModel')

// returns an object with specified properties suitable 
// for a User entry in the database.
const specifed = (fName, lName, pass, email) => {
    return {
        firstName: fName,
        lastName: lName,
        password: pass,
        email: email
    };
}

// returns an object with randomly-generated properties suitable 
// for a User entry in the database.
const random = () => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: "password",
        email: faker.internet.email(),
    };
}

const createRandom = () => {
    const userData = random()
    console.log(`Creating ${userData.email} with password ${userData.password}`)
    return UserModel.create(userData);
}

module.exports = {
    specifed: specifed,
    random: random,
    createRandom: createRandom,
};

