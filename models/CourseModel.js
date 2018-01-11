const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    pool: { type: Schema.Types.ObjectId, ref: 'Pool' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    betAmount: { type: Number, default: 25, },
    enrollVerification: { type: Schema.Types.ObjectId, ref: 'Verification' },
    completedVerification: { type: Schema.Types.ObjectId, ref: 'Verification' },
    payment: {type: Schema.Types.ObjectId, ref: 'Payment' },
    refund: {type: Schema.Types.ObjectId, ref: 'Payment'} ,
    created: { type: Date, default: Date.now, required: true },
})

/* 
 * pre-save error checker
 */

courseSchema.pre('save', function(next) {
    
    if( this.startDate > this.endDate ) {
        next( new Error('Course end date must be greater than course start date!') );
        return;
    }
    next();
});

const CourseModel = mongoose.model('Course', courseSchema);
module.exports = CourseModel;
