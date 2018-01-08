const express = require('express');
const router = express.Router();
const settings = require('../../app_settings');

const moment = require('moment')

const PoolModel = require('../../models/PoolModel')
const CourseModel = require('../../models/CourseModel');

const PoolFactory = require('../../factories/Pool')

router.get('/', (req, res) => {
    const query = req.query || {}
    if (query.courseId) {
        query.course = { _id: query.courseId }
        delete query.courseId;
    }

    PoolModel.find(query)
    .sort('startDate')
    .then(pools => {
        const isQueryEmpty = Object.keys(query).length === 0 && query.constructor === Object
        if (!isQueryEmpty || pools && pools.length > 0) {
            return Promise.resolve(pools)
        } else {
            console.log("Creating pools.")
            return PoolFactory.createPoolsForCurrentYear(moment().year())
        }
    }).then(pools => {
        res.json({
            pools: pools,
        })
    }).catch(err => {
        console.log(err)
        res.json({
            error: err.message,
        })
    })
});

module.exports = router;