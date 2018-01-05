const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = Schema({
    name: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    pool: { type: Schema.Types.ObjectId, ref: 'Pool' },
    startDate: Date,
    endDate: Date,
    enrollVerification: { type: Schema.Types.ObjectId, ref: 'Verification' },
    completedVerification: { type: Schema.Types.ObjectId, ref: 'Verification' },
    payment: {type: Schema.Types.ObjectId, ref: 'Payment' },
    refund: {type: Schema.Types.ObjectId, ref: 'Payment'} ,
    created: { type: Date, default: Date.now },
})

const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = CourseModel;