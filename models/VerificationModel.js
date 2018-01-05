const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verificationSchema = Schema({
    name: String,
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    type: { type: String, enum: ["enrollment", "completion"]},
    imgURL: String,
    approver: { type: Schema.Types.ObjectId, ref: 'User' },
    approvalDate: Date,
})

const VerificationModel = mongoose.model('Verification', verificationSchema);

module.exports = VerificationModel;