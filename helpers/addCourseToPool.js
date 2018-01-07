const moment = require('moment');
const PoolModel = require('../models/PoolModel');

// find a pool for the course or create a new one.
// returns a promise resolving with the pool
const addCourseToPool = (course) => {

    return new Promise((resolve, reject) => {

        return PoolModel.create({
            startDate: course.startDate,
            endDate: course.endDate,
            course: course,
        }).then(pool => {
            resolve(pool);
        }).catch(err => {
            reject(err);
        });

        // TODO: handle finding an existing pool for the course
        /*
        // establish search ranges for pools
        const rangeType = 'weeks'
        const startRange = 2;
        const minStartDate = moment(course.startDate).subtract(startRange, rangeType);
        const maxStartDate = moment(course.startDate).add(startRange, rangeType);
        
        const endRange = 1;
        const minEndDate = moment(course.endDate).subtract(endRange, rangeType);
        const maxEndDate = moment(course.endDate).add(endRange, rangeType);

        // find any pools that are within the date range of the course
        PoolModel.find({
            endDate: {
                $gte: minEndDate,
                $lt: maxEndDate,
            },
            startDate: {
                $gte: minStartDate,
                $lt: maxStartDate,
            },
        }).then(pools => {
            // console.log(pools);
            if (pools) {
                // pick one of the pools to add the course
                // TODO: make this more intelligent
                // maybe by the closest date or by the pool with the most
                // or fewest people
                resolve(pools[0]);
            } else {
                console.log(course);
                // no pool found, create a new pool for the course
                // console.log(course);
                promise = PoolModel.create({
                    startDate: course.startDate,
                    endDate: course.endDate,
                    courses: [course],
                }).then(pool => {
                    // i don't know if this will work
                    resolve(pool);
                }).catch(err => {
                    // i don't know if this will work either
                    reject(err);
                });
            }
        }).catch(err => {
            console.log(err);
            reject(err);
        });
        */
    });
};

module.exports = addCourseToPool;