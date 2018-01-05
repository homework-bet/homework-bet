/*
 * User.js: User creation factory
 */

const faker = require('faker');

module.exports = {

    // returns an object with specified properties suitable 
    // for a User entry in the database.

    specified: function(cName, user, sDate, eDate) {
        return {
            name: cName,
            user: user,
            startDate: sDate,
            endDate: eDate,
        };
    },
    
    // returns an object with randomly-generated properties suitable 
    // for a User entry in the database.

    random: function(user) {
        return { 
            name: faker.company.catchPhraseNoun() + " " + Math.ceil(Math.random() * 400),
            user: user,
            startDate: new Date(),  // now
            endDate: new Date(2020, 0), // 1/1/2020 --> months are 0-indexed
        };
    }
};

