const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poolSchema = mongoose.Schema({
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    courses: [
        { type: Schema.Types.ObjectId, ref: 'Course' }
    ],
    transactions: [
        { type: Schema.Types.ObjectId, ref: 'Transaction' }
    ],
    created: { type: Date, default: Date.now },
});

const PoolModel = mongoose.model('Pool', poolSchema);

module.exports = PoolModel;
