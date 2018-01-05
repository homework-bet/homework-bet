const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poolSchema = mongoose.Schema({
    startDate: Date,
    endDate: Date,
    courses: [
        { type: Schema.Types.ObjectId, ref: 'Course' }
    ],
    transactions: [
        { type: Schema.Types.ObjectId, ref: 'Transactions' }
    ],
    created: { type: Date, default: Date.now },
});

const PoolModel = mongoose.model('Pool', poolSchema);

module.exports = PoolModel;