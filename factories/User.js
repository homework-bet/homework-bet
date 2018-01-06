/*
 * User.js: User creation factory
 */

const faker = require('faker');

module.exports = {

    // returns an object with specified properties suitable 
    // for a User entry in the database.

    specified: function(fName, lName, pass, email) {
        return {
            firstName: fName, 
            lastName: lName, 
            password: pass,
            email: email

        };
    },
    
    // returns an object with randomly-generated properties suitable 
    // for a User entry in the database.

    random: function() {
        return { 
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: faker.internet.password(),
            email: faker.internet.email(),
        };

    }
};

