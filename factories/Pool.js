const moment = require('moment');
const PoolModel = require('../models/PoolModel')

const random = () => {
    return {
        startDate: moment(),
        endDate: moment().add(3, 'months'),
    }
}

const generateYear = (year) => {
    return [
        { startDate: new Date(year, 0, 1), endDate: new Date(year, 2, 31) },
        { startDate: new Date(year, 3, 1), endDate: new Date(year, 5, 30) },
        { startDate: new Date(year, 6, 1), endDate: new Date(year, 8, 30) },
        { startDate: new Date(year, 9, 1), endDate: new Date(year, 11, 31) },
    ];
}

const createPoolsForCurrentYear = () => {
    const poolDataArray = generateYear(moment().year())
    return PoolModel.create(poolDataArray).then(pools => {
        console.log("Creating pools.")
        return Promise.resolve(pools);
    }).catch(err => {
        return Promise.reject(err);
    });
}

module.exports = {
    random: random,
    generateYear: generateYear,
    createPoolsForCurrentYear: createPoolsForCurrentYear,
}
