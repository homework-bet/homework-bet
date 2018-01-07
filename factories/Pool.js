const moment = require('moment');

module.exports = {
    random: () => {
        return {
            startDate: moment(),
            endDate: moment().add(3, 'months'),
        }
    }
}