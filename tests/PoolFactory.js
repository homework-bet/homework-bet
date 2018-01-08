const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const PoolFactory = require('../factories/Pool');

describe('PoolFactory Tests', () => {
    it('should generate a list of pool start/end dates for 2018', () => {
        pooldates = PoolFactory.generateYear(2018);

        assert(pooldates[0].startDate.getTime() === (new Date(2018, 0, 1)).getTime());
        assert(pooldates[0].endDate.getTime() === (new Date(2018, 2, 31)).getTime());

        assert(pooldates[1].startDate.getTime() === (new Date(2018, 3, 1)).getTime());
        assert(pooldates[1].endDate.getTime() === (new Date(2018, 5, 30)).getTime());

        assert(pooldates[2].startDate.getTime() === (new Date(2018, 6, 1)).getTime());
        assert(pooldates[2].endDate.getTime() === (new Date(2018, 8, 30)).getTime());

        assert(pooldates[3].startDate.getTime() === (new Date(2018, 9, 1)).getTime());
        assert(pooldates[3].endDate.getTime() === (new Date(2018, 11, 31)).getTime());
    });
});