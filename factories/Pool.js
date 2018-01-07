const moment = require('moment');

module.exports = {
    random: () => {
        return {
            startDate: moment(),
            endDate: moment().add(3, 'months'),
        }
    },
    generateYear: (year) => {
        return [
            {startDate: new Date(year, 0, 1), endDate: new Date(year, 2, 31)},
            {startDate: new Date(year,3, 1), endDate: new Date(year, 5, 30)},
            {startDate: new Date(year, 6, 1), endDate: new Date(year, 8, 30)},
            {startDate: new Date(year, 9, 1), endDate: new Date(year, 11, 31)},
        ];
    }
}
