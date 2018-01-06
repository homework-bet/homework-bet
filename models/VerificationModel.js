const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verificationSchema = Schema({
    name: {type: String, required: true},
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    type: { type: String, enum: ["enrollment", "completion"]},
    imgURL: {type: String, required: true},
    approver: { type: Schema.Types.ObjectId, ref: 'User' },
    approvalDate: Date,
})

const VerificationModel = mongoose.model('Verification', verificationSchema);

module.exports = VerificationModel;
