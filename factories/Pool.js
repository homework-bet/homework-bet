const moment = require('moment');

const UserFactory = require('./User')
const UserModel = require('../models/UserModel')
const CourseFactory = require('./Course')
const CourseModel = require('../models/CourseModel')
const PoolModel = require('../models/PoolModel')

const random = () => {
    return {
        startDate: moment(),
        endDate: moment().add(3, 'months'),
    }
}

const generateYear = year => {
    return [
        {startDate: new Date(year, 0, 1), endDate: new Date(year, 2, 31)},
        {startDate: new Date(year,3, 1), endDate: new Date(year, 5, 30)},
        {startDate: new Date(year, 6, 1), endDate: new Date(year, 8, 30)},
        {startDate: new Date(year, 9, 1), endDate: new Date(year, 11, 31)},
    ];
}

const createPools = (year, numUsers, numCoursesEach) => {
    let poolDataArray = generateYear(year);
    const userDataArray = [];
    for(let i = 0; i < numUsers; i++) {
        const userData = UserFactory.random()
        userDataArray.push(UserFactory.random());
    }
    let users = [];

    return UserModel.create(userDataArray)
    .then(users => {
        const coursePromises = [];
        for (let i = 0; i < numUsers; i++) {
            console.log(`Created ${userDataArray[i].email} with password: ${userDataArray[i].password}`)
            const courseDataArray = []
            for (let j = 0; j < numCoursesEach; j++) {
                courseDataArray.push(CourseFactory.random(users[i]))
            }
            coursePromises.push(CourseModel.create(courseDataArray))
        }
        
        return Promise.all(coursePromises)
    }).then(coursesNested => {
        let courses = [];

        for (let i = 0; i < coursesNested.length; i++) {
            for(let j = 0; j < coursesNested[i].length; j++) {
                courses.push(coursesNested[i][j])
            }
        }

        poolDataArray.forEach(poolData => {
            poolData.courses = courses;
        })

        console.log(`Added ${numCoursesEach} courses to each user.`)

        return PoolModel.create(poolDataArray)
        return Promise.resolve()
    }).catch(err => {
        console.log(err)
       return Promise.reject(err)
    })
}

module.exports = {
    random: random,
    generateYear: generateYear,
    createPools: createPools,
}
